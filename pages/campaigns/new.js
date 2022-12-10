import React, {useState, useEffect} from 'react'
import {Form, Button, Input, Message} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../../components/Layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import {Link, Router} from '../../routes'

const campaingNew = () => {
    const [minimumContribution, setMinimumContribution] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            setLoading(true)
            const accounts = await web3.eth.getAccounts()
            console.log(accounts)
            await factory.methods.createCampaign(minimumContribution).send({
                from: accounts[0]
            })
            Router.pushRoute('/')
        }catch(err){
            setLoading(false)
            setErrorMessage(err.message)
        }
    }
    return (
        <Layout>
            <h3>Create a campaign</h3>
            <Form onSubmit={onSubmit} >
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label='Wei' 
                        labelPosition='right' 
                        value={minimumContribution}
                        onChange={(e) => {
                            setMinimumContribution(e.target.value)
                        }}
                    />
                </Form.Field>  
                <Button loading={loading} primary >Create</Button>
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

export default campaingNew