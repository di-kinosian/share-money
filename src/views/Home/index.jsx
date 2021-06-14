import '../../App.css';

function Home() {
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
        </div>
    );
}

export default Home;
