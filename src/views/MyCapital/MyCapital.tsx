import { Button, ElementSize, Input, Option } from '@makhynenko/ui-components';
import {
  BodyText,
  BodyTextHighlight,
  Flex,
  H5,
  HorisontalSeparator,
} from '../../components/styled';
import { useModalState, useModals } from '../../helpers/hooks';
import { useEffect, useMemo, useState } from 'react';
import { database } from '../../firebase';
import { push, ref, set } from 'firebase/database';
import { useValue } from '../../firebase/hooks';
import { useSelector } from 'react-redux';
import { Icons } from '@makhynenko/ui-components';
import Modal from '../../components/Modal';
import { CurrencySelector } from '../../components/CurrencySelector';
import { ICapitalState, IField } from '../../firebase/types';
import { InputField } from '../../components/InputField';
import * as s from './styled';
// import { initCapitalConfig, onAddField, onChangeBasicCurrency } from '../../firebase/capital';

const initCapitalConfig = (userId: string) => {
  const initialState: ICapitalState = {
    config: {
      basicCurrency: 'USD',
      fields: {},
    },
    reports: {},
  };
  set(ref(database, 'capitals/' + userId), initialState);
};
type Props = {
  tabs: Option[];
  activeTab: string;
  onChange: (activeTab: string) => void;
};

const Tabs = ({ tabs, activeTab, onChange }: Props) => {
  return (
    <div>
      <s.Tabs>
        {tabs.map((t) => (
          <s.Tab
            className={activeTab === t.value ? 'active' : ''}
            onClick={() => onChange(t.value)}
          >
            <BodyTextHighlight>{t.label}</BodyTextHighlight>
          </s.Tab>
        ))}
      </s.Tabs>
      <HorisontalSeparator />
    </div>
  );
};

function MyCapital() {
  const [currencyForField, setCurrencyForField] = useState('');

  const { open } = useModals('addNewSource');
  const user = useSelector((s: any) => s.auth.user);
  const [activeTab, setActiveTab] = useState('reports');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const capitalRef = useMemo(
    () => ref(database, 'capitals/' + user._id),
    [user]
  );

  const {
    isOpen: isCapitalModalOpen,
    open: openCapitalModal,
    close: closeCapitalModal,
  } = useModalState();

  const changeTitle = (event) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const reset = () => {
    setTitleError('');
    setTitle('');
    setCurrencyError('');
    setCurrencyForField('');
    closeCapitalModal();
  };

  const onSubmit = () => {
    const newField = {
      name: title,
      currency: currencyForField,
    };

    if (title && currencyForField) {
      onAddField(newField);
      reset();
    }
    if (!title) {
      setTitleError('Name is required');
    }
    if (!currencyForField) {
      setCurrencyError('Currency is required');
    }
  };

  const onCloseModal = () => {
    closeCapitalModal();
    reset();
  };

  const { value, loading } = useValue<ICapitalState>(capitalRef);

  const fields = useMemo(() => {
    return Object.values(value?.config.fields || {}) || [];
  }, [value]);
  console.log(fields);
  useEffect(() => {
    if (!loading && !value) {
      initCapitalConfig(user._id);
    }
  }, [loading, value, user]);

  const onChangeBasicCurrency = (code: string) => {
    set(ref(database, 'capitals/' + user._id + '/config/basicCurrency'), code);
  };

  const onAddField = (field: Omit<IField, 'id'>) => {
    const fieldsRef = ref(database, 'capitals/' + user._id + '/config/fields');
    const newFieldRef = push(fieldsRef);
    set(newFieldRef, {
      ...field,
      id: newFieldRef.key,
    });
  };

  const fieldsModal = () => {
    return (
      <Modal
        onClose={onCloseModal}
        isOpen={isCapitalModalOpen}
        // header={data ? 'Edit balance' : 'Create new balance'}
        header="Create new field"
      >
        <s.ModalContent>
          <InputField label="Balance name" errorText={titleError}>
            <Input
              size={ElementSize.Large}
              placeholder="Enter balance name"
              value={title}
              onChange={changeTitle}
            />
          </InputField>
          <InputField label="Currency" errorText={currencyError}>
            <CurrencySelector
              currencyError={currencyError}
              currency={currencyForField}
              onChange={setCurrencyForField}
            />
          </InputField>
          <Button
            variant="primary"
            onClick={onSubmit}
            width="100%"
            size={ElementSize.Large}
          >
            {/* {data ? 'Save' : 'Create'} */}
            {'Save'}
          </Button>
        </s.ModalContent>
      </Modal>
    );
  };

  const renderSettingsContent = () => {
    return (
      <>
        <s.SettingsWrapper>
          <s.CurrencyRow>
            <BodyText>Basic currency</BodyText>
            <CurrencySelector
              onChange={onChangeBasicCurrency}
              currency={value?.config.basicCurrency}
              renderControl={(code) => {
                return (
                  <s.CurrencySelector>
                    <s.SelectorValue>
                      <BodyTextHighlight>{code}</BodyTextHighlight>
                      <Icons name="chevronDown" />
                    </s.SelectorValue>
                  </s.CurrencySelector>
                );
              }}
            />
          </s.CurrencyRow>
          <s.FieldsList>
            {fields.map(({ name, currency }) => (
              <s.ItemField>
                <s.FieldInfo>
                  <BodyText>{name}</BodyText>
                  <BodyText>{`(${currency})`}</BodyText>
                </s.FieldInfo>
                <Icons name="moreVertical" />
              </s.ItemField>
            ))}
          </s.FieldsList>
          <Button
            variant="ghost"
            size={ElementSize.Large}
            onClick={openCapitalModal}
            // color={"rgb(105, 226, 212)"}\
          >
            + Add new field
          </Button>
        </s.SettingsWrapper>
        {fieldsModal()}
      </>
    );
  };

  return (
    <>
      <Flex padding="16px" direction="column" gap="8px">
        <H5>My Capital</H5>
        <div>Capital amount should be here</div>
      </Flex>
      <Tabs
        tabs={[
          { value: 'reports', label: 'Reports' },
          { value: 'setting', label: 'Settings' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      {activeTab === 'setting' ? renderSettingsContent() : null}
    </>
  );
}

export default MyCapital;
