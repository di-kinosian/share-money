import { useSelector } from 'react-redux';
import './styles.css';
import { getUser } from '../../modules/auth/duck';
import UserBalances from './UserBalances';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

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
        <div className="container-home-page">
            <div className="home-page">Spent money together!</div>
            <Button variant="primary" onClick={onLoginClick}>
                Login
            </Button>
        </div>
    );
}

export default Home;
