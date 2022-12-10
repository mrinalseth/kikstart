import React, {useState} from 'react'
import {Form,Input, Message, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'

const ContributeForm = (props) => {
    const [value, setValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        const campaign = Campaign(props.address)
        try {
            setLoading(true)
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contibute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })
            window.location.reload()
        }catch(err) {
            setLoading(false)
            setErrorMessage(err.message)
        }
    }

    return (
        <div>
            <Form onSubmit={onSubmit} >
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input 
                    label='ETH' 
                    labelPosition='right'
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                />
            </Form.Field>
            <Button loading={loading} primary >Contribute</Button>
        </Form>
        {errorMessage===''
        ? null
        :<Message 
            error 
            header="Oops!" 
            content={errorMessage}
        /> }
        </div>
    )
}

export default ContributeForm