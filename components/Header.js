import React from 'react'
import {Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from '../routes'

const Header = () => {
    return (
        <Menu style={styles.main} >
            <Link route='/' >
                <a className="item">CrowdCoin</a>
            </Link>
            <Menu.Menu
            position='right' >
                <Link route='/' >
                <a className="item">Campaigns</a>
                </Link>

                <Link route='/campaigns/new' >
                <a className="item">+</a>
            </Link>
            </Menu.Menu>
        </Menu>
    )
}

const styles = {
    main: {
        marginTop: '20px'
    }
}


export default Header