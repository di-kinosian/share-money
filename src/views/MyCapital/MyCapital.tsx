import { Button, ElementSize, Input, Option } from '@makhynenko/ui-components';
import {
  BodyText,
  BodyTextHighlight,
  Flex,
  H5,
  HorisontalSeparator,
} from '../../components/styled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
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
  const user = useSelector((s: any) => s.auth.user);
  const capitalRef = useMemo(
    () => ref(database, 'capitals/' + user._id),
    [user]
  );
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

  const validationSchema = useMemo(() => {
    return Yup.object().shape(
      fields.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: Yup.number()
            .typeError('The value should be a number')
            .required('Field is required'),
        }),
        {}
      )
    );
  }, [fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reportFields: fields?.map((field) => ({ [field.id]: '' })),
    },
  });

  const [currencyForField, setCurrencyForField] = useState('');
  const { open } = useModals('addNewSource');
  const [activeTab, setActiveTab] = useState('reports');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const {
    isOpen: isFieldModalOpen,
    open: openFieldModal,
    close: closeFieldModal,
  } = useModalState();

  const {
    isOpen: isReportModalOpen,
    open: openReportModal,
    close: closeReportModal,
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
    closeFieldModal();
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

  const onRepotSubmit = (values) => {
    console.log(values, 'data');
  };

  const onCloseModal = () => {
    closeFieldModal();
    reset();
  };

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

  const basicCurrency = (title: string) => {
    return (
      <Flex justify="space-between" align="center">
        <BodyText>{title}</BodyText>
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
      </Flex>
    );
  };

  const reportModal = () => {
    return (
      <Modal
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        header="Add report"
      >
        <s.ModalContent>
          <Flex justify="space-between" align="center">
            <BodyText>Currency:</BodyText>
            <BodyTextHighlight>{value?.config.basicCurrency}</BodyTextHighlight>
          </Flex>
          <form onSubmit={handleSubmit(onRepotSubmit)}>
            <Flex direction="column" gap="16px">
              <InputField label="Fields">
                <s.ReportFields>
                  {fields.length &&
                    fields.map((item) => (
                      <s.DetailsCard key={item.id}>
                        <BodyTextHighlight>{item.name}</BodyTextHighlight>
                        <Flex
                          justify="space-between"
                          direction="row"
                          align="center"
                        >
                          <BodyText>amount</BodyText>
                          <Flex align="center" gap="8px">
                            <Input
                              placeholder="number"
                              width="100px"
                              {...register(item.id as never)}
                              invalid={Boolean(errors[item.id])}
                            />
                            <BodyText>{item.currency}</BodyText>
                          </Flex>
                        </Flex>
                        {errors && (
                          <BodyText color="red">
                            {errors[item.id]?.message}
                          </BodyText>
                        )}
                      </s.DetailsCard>
                    ))}
                </s.ReportFields>
              </InputField>
              <Button variant="primary" size={ElementSize.Large} width="100%">
                Submit
              </Button>
            </Flex>
          </form>
        </s.ModalContent>
      </Modal>
    );
  };

  const fieldModal = () => {
    return (
      <Modal
        onClose={onCloseModal}
        isOpen={isFieldModalOpen}
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
            {'Save'}
          </Button>
        </s.ModalContent>
      </Modal>
    );
  };

  const renderSettingsContent = () => {
    return (
      <>
        <s.PageWrapper>
          {basicCurrency('Basic currency')}
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
            onClick={openFieldModal}
            // color={"rgb(105, 226, 212)"}\
          >
            + Add new field
          </Button>
        </s.PageWrapper>
        {fieldModal()}
      </>
    );
  };

  const renderReportsContent = () => {
    return (
      <>
        <s.PageWrapper>
          <Button
            variant="ghost"
            size={ElementSize.Large}
            onClick={openReportModal}
          >
            + Add new report
          </Button>
        </s.PageWrapper>
        {reportModal()}
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
      {activeTab === 'setting'
        ? renderSettingsContent()
        : renderReportsContent()}
    </>
  );
}

export default MyCapital;
