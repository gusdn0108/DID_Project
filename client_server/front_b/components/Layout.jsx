import Header from './Header.jsx'

const Layout = ({ children}) => {


    return (
        <div>
            <Header children={children} />
                {children}
        </div>
    );
}


export default Layout;