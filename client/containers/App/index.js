import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Form } from 'formsy-react'
import Menu from 'material-ui/lib/menus/menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import FormsySelect from 'formsy-material-ui/lib/FormsySelect'
require('isomorphic-fetch')
injectTapEventPlugin()

var msg = `Greetings! I am writing to urge you to co-sponsor the Partner with Korea Act (H.R.1019), which amends the Immigration and Nationality Act to create an E-4 professional visa category.
The U.S. set aside 5,400 H-1B visas for nationals of Singapore and 1,400 H-1Bs for nationals of Chile when the U.S. agreed to free trade agreements with the two nations.
By creating the E-4 professional visa for South Korea, H.R. 1019 will create numerous jobs and business opportunities in the U.S.`

class App extends Component {
  constructor (props) {
    super(props)
    this.enableButton = this.enableButton.bind(this)
    this.disableButton = this.disableButton.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  enableButton () {
    this.setState({
      canSubmit: true
    })
  }

  disableButton () {
    this.setState({
      canSubmit: false
    })
  }

  submitForm (model) {
    // Submit your validated form
    fetch('http://127.0.0.1:3000/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(model)
    })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.msg !== undefined) {
        alert(res.msg)
      } else {
        alert(res.json())
      }
    })
    .catch((err) => {
      if (err.msg !== undefined) {
        alert(err.msg)
      } else {
        alert(err.json())
      }
    })

  }

  render () {
    return (
      <Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
      >

         <FormsyText
           name='from_name'
           validations='isWords'
           required
           hintText='What is your name?'
           value='Donald Trump'
           floatingLabelText='Full Name'
         />
         <FormsyText
           name='line1'
           required
           hintText='Street Address'
           value='725 Gough St'
           floatingLabelText='Street Address'
         />
         <FormsyText
           name='line2'
           hintText='APT / Suite Number'
           value='Apt Q'
           floatingLabelText='APT / Suite Number'
         />
         <FormsyText
           name='city'
           required
           hintText='City'
           value='San Francisco'
           floatingLabelText='City'
         />
         <FormsyText
           name='state'
           required
           hintText='State'
           value='CA'
           floatingLabelText='State'
         />
         <FormsyText
           name='zip'
           hintText='Zip'
           value='94102'
           floatingLabelText='Zip'
         />
         <FormsySelect
          name='levels'
          required
          value='administrativeArea1'
          floatingLabelText='Levels'>
          <MenuItem value={'administrativeArea1'} primaryText='administrativeArea1' />
          <MenuItem value={'administrativeArea2'} primaryText='administrativeArea2' />
          <MenuItem value={'country'} primaryText='country' />
          <MenuItem value={'international'} primaryText='international' />
          <MenuItem value={'locality'} primaryText='locality' />
          <MenuItem value={'regional'} primaryText='regional' />
          <MenuItem value={'special'} primaryText='special' />
          <MenuItem value={'subLocality1'} primaryText='subLocality1' />
          <MenuItem value={'subLocality2'} primaryText='subLocality2' />
        </FormsySelect>
        <FormsySelect
         name='roles'
         required
         value='legislatorUpperBody'
         floatingLabelText='Roles'>
         <MenuItem value={'deputyHeadOfGovernment'} primaryText='deputyHeadOfGovernment' />
         <MenuItem value={'executiveCouncil'} primaryText='executiveCouncil' />
         <MenuItem value={'governmentOfficer'} primaryText='governmentOfficer' />
         <MenuItem value={'headOfGovernment'} primaryText='headOfGovernment' />
         <MenuItem value={'headOfState'} primaryText='headOfState' />
         <MenuItem value={'highestCourtJudge'} primaryText='highestCourtJudge' />
         <MenuItem value={'judge'} primaryText='judge' />
         <MenuItem value={'legislatorLowerBody'} primaryText='legislatorLowerBody' />
         <MenuItem value={'legislatorUpperBody'} primaryText='legislatorUpperBody' />
         <MenuItem value={'schoolBoard'} primaryText='schoolBoard' />
         <MenuItem value={'specialPurposeOfficer'} primaryText='specialPurposeOfficer' />
       </FormsySelect>
       <FormsyText
         required
         multiLine
         rowsMax={40}
         rows={15}
         name='msg'
         value = {msg}
        />
        <RaisedButton
          type='submit'
          label='Submit'
          primary={true}
        />
      </Form>
    )
  }
}

export default App
