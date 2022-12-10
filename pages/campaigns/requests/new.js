import React, {useState} from 'react'
import {Form, Input, Button, Message} from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3'
import {Link, Router} from '../../../routes'

const newRequest = (props) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const campaign = Campaign(props.address)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), address).send({
                from: accounts[0]
            })
            Router.pushRoute(`/campaigns/${props.address}/requests`)
        }catch(err) {
            setLoading(false)
            setErrorMessage(err.message)
        }
    }

    return (
        <Layout>
            <Link route={`/campaigns/${props.address}/requests`} >
                <a><strong>Back</strong></a>
            </Link>
            <h3>new requets</h3>
            <Form onSubmit={onSubmit}>

                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Value(in ETH)</label>
                    <Input
                        label="ETH"
                        labelPosition="right"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Field>

                <Button loading={loading} primary>
                    Create Request
                </Button>

            </Form>
            {errorMessage===''
            ? null
            :<Message 
                error 
                header="Oops!" 
                content={errorMessage}
            /> }
        </Layout>
        
    )
}

newRequest.getInitialProps = (props) => {
    const {address} = props.query
    return{address}
}

export default newRequest