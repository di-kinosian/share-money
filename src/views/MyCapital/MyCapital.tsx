import { Option } from '@makhynenko/ui-components';
import {
  BodyTextHighlight,
  Flex,
  H5,
  HorisontalSeparator,
} from '../../components/styled';
import { useModals } from '../../helpers/hooks';
import * as s from './styled'
import { useMemo, useState } from 'react';
import { auth, database } from '../../firebase';
import { ref } from 'firebase/database';
import { useValue } from '../../firebase/hooks';
import { useSelector } from 'react-redux';

type Props = {
  tabs: Option[];
  activeTab: string;
  onChange: (activeTab: string) => void;
}

const Tabs = ({ tabs, activeTab, onChange }: Props) => {
  return (
    <div>
      <s.Tabs>
        {tabs.map(t => <s.Tab className={activeTab === t.value ? 'active' : ''} onClick={() => onChange(t.value)}>
          <BodyTextHighlight>{t.label}</BodyTextHighlight>
        </s.Tab>)}
      </s.Tabs>
      <HorisontalSeparator />
    </div>
  )
}


function MyCapital() {
  const { open } = useModals('addNewSource')
  const user = useSelector((s: any) => s.auth.user)
  const [activeTab, setActiveTab] = useState('reports')
  console.log(auth);
  
  console.log(user);
  
  const capitalRef = useMemo(() => ref(database, 'capitals/' + user._id), [user])

  const capitalData = useValue(capitalRef)

  console.log(capitalData);

  return (
    <>
      <Flex padding="16px" direction='column' gap="8px">
        <H5>My Capital</H5>
        <div>Capital amount should be here</div>
      </Flex>
      <Tabs
        tabs={[{ value: 'reports', label: 'Reports' }, { value: 'setting', label: 'Settings' }]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </>

  );
}

export default MyCapital;
