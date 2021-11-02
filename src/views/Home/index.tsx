import { useSelector } from 'react-redux';
import { getUser } from '../../modules/auth/duck';
import UserBalances from './UserBalances';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import * as s from './styled';


function Home() {
    const history = useHistory();
    const user = useSelector(getUser);

    if (user) {
        return <UserBalances />;
    }

    const onLoginClick = () => {
        history.push(ROUTES.LOGIN);
    };
    return (
        <s.ContainerHomePage>
            <s.PageTitle>Spent money together!</s.PageTitle>
            <Button variant="primary" onClick={onLoginClick}>
                Login
            </Button>
        </s.ContainerHomePage>
    );
}

export default Home;
