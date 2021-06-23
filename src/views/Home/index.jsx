import { useDispatch, useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import '../../App.css';
import { addBalace } from '../../modules/core/duck';

function Home() {
    const dispatch = useDispatch();
    
    const addBalanceInProgress = useSelector((state) => state.core.addBalanceInProgress)

    const onAddBalance = () => {
        dispatch(addBalace())
        console.log('here');
    }

    return (
        <div className="container-home-page">
            <div className="home-page">Home page</div>
            <div className="partners">
                <div className="name-partners">Максим Крупенко</div>
                <div className="balance-partners">134</div>
            </div>
            <div className="partners">
                <div className="name-partners">Денис Горбач</div>
                <div className="balance-partners">134</div>
            </div>
            <div className="partners">
                <div className="name-partners">Андрей Таран</div>
                <div className="balance-partners">134</div>
            </div>
            <div className="add-balance-button" onClick={onAddBalance}>
                {addBalanceInProgress ? <Loader active /> : <><Icon name="add circle"/> Create new balance</>}
            </div>
        </div>
    );
}

export default Home;
