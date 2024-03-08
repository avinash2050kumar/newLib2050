 
<span>Empower your platform with seamless financial integration using these White Label UI Components. Designed for easy customisation and seamless integration, our UI components offer:
<br/><b>Customisation:</b> Tailor the look and feel to match your brand.<br/>
<b>Modularity:</b> Choose functionalities that fit your needs.<br/>
<b>Security:</b> Industry-leading standards to protect user data.<br/>
<b>Scalability:</b> Reliable performance for any user load.<br/>
Get started today with our developer-friendly APIs and comprehensive documentation!</span>
<br/><br/><br/>
Contact to our team for the WLC-design

<h1>White Label Components</h1>
These are the available white label components.

- [Register Finance](#RegisterFinance)
- [Finance Application Form](#FinanceApplicationForm)
- [Repayment Modal](#RepaymentModal)
- [Summary Card](#SummaryCard)
- [Loan Details](#LoanDetails)
- [Banner](#Banner)
- [Loan List](#LoanList)

First install the React js sdk by running one of these command

```yarn add newlibs2050```

Or

```npm install newlibs2050```


<br/>
<br/>

<h3>Configure</h3>

```typescript jsx
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { LMSProvider } from 'newlibs2050'

function App() {
	const [token, setToken] = useState('')

	const fetchToken = useCallback(async () => {
		// generate the token and assign to the setToken hook 
	}, [])

	useEffect(() => {
		fetchToken()
	}, [fetchToken])
    
	return (
		<LMSProvider
			base_url={/* provide the base url*/}
			token={token}
			email={/*provide the email address */}
		>
			{/* children */}
		</LMSProvider>
	)
}

export default App


```

Wrap your top level-component with LMSProvider.
```Note: White label component works inside LMSProvider```

| Parameter       | Required? | Type              | Description                                                                                                              |
|-----------------|:---------:|-------------------|--------------------------------------------------------------------------------------------------------------------------|
| base_url        |   true    | `string`          | Provide the base url or contact us                                                                                       |
| token           |   true    | `string`          | Generate the token and pass it to the LMSProvider                                                                        |
| email           |   false   | `string`          | If you are new then simply pass emptyString(''). Later, you can modify the email address using [useLMS()](#useLMS) hook. |
| theme        |   false   | `light` or `dark` | You can pass theme mode like light or dark                                                                               |
| palette     |   false   | `Theme palette`   | For more info see the [theme](#Theme) section                                                                            |

Now Configuration is done. You are free to use any white label component if you business is already register.
<br/>
<br/>
<br/>
<br/>

## RegisterFinance

```typescript jsx
import React, { useState } from 'react'
import { RegisterFinance } from 'newlibs2050' 

export const Component = () => {
	return <RegisterFinance onSuccess={(business: IBusiness) => console.log('business',business)} />
}

```

It will help you to register your business information with us.

| Parameter | Required? | Type       | Description                                                                        |
|-----------|:---------:|------------|------------------------------------------------------------------------------------|
| onSuccess |   false   | `function` | it will return business type object, once you successfully submitted your request. |



<br/>
<br/>
<br/>
<br/>

## FinanceApplicationForm

```typescript jsx
import React, { useState } from 'react'
import { FinanceApplicationForm } from 'newlibs2050'  

export const Component = () => {
	return <FinanceApplicationForm onSuccess={(loan) => console.log('loan', loan._id)} />
}

```
 

You can apply your loan via this component

| Parameter | Required? | Type       | Description                                                                    |
|-----------|:---------:|------------|--------------------------------------------------------------------------------|
| onSuccess |   false   | `function` | it will return loan type object, once you successfully submitted your request. |

<br/>
<br/>
<br/>
<br/>

## RepaymentModal

```typescript jsx
import React, { useState } from 'react'
import { RepaymentModal } from 'newlibs2050' 

export const Component = () => {
	return <RepaymentModal onSuccess={(loan) => console.log('loan', loan)} />
}

```

| Parameter | Required? | Type       | Description                                                                   |
|-----------|:---------:|------------|-------------------------------------------------------------------------------|
| loanId    |   true    | `string`   | once you receive the loan object get the loan id and pass it to this component |
| onSuccess |   false   | `function` | It will fire, whenever your request successfully saved with us.               |
| open      |   true    | `boolean`  | It will set the visibility of the modal                                       |
| onClose   |   false   | `function` | It will trigger once user clicks on the close, cancel button                  |


<br/>
<br/>
<br/>
<br/>

## SummaryCard
```typescript jsx
import React, { useState } from 'react'
import { SummaryCard } from 'newlibs2050' 

export const Component = () => {
	const {userDetail} = useLMS()
	
	return <SummaryCard 
                    onClick={() => {
		                /* Write your business logic, eg: navigate to the other screen */
	                    }} 
                />
}

```

| Parameter | Required? | Type        | Description                                                                                                                                                                                       |
|-----------|:---------:|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onClick   |   false   | `function`  | It will call whenever user click on Apply for financing                                                                                                                                           |


<br/>
<br/>
<br/>
<br/>

## LoanDetails
```typescript jsx
import React, { useState } from 'react'
import { LoanDetails } from 'newlibs2050' 

export const Component = () => {
	const {userDetail} = useLMS()
	
	return <LoanDetails
                    loanId={'65d8c8034a5df5b079172dec'} // pass your loanId 
                    onRecordClick={() => {
						// do something
                    }}
                    isRepayment={false}
                />
}

```


| Parameter | Required? | Type       | Description                                                 |
|-----------|:---------:|------------|-------------------------------------------------------------|
| loanId   |   true    | `string`   | Pass the loan id to see the loan details                    |
| isRepayment |   false   | `boolean`  | pass if you want default tab selected to "Repayment"        |
| onRecordClick |   false   | `function` | it will call whenever user clicks on Record payments button |


<br/>
<br/>
<br/>
<br/>


## Banner
```typescript jsx
import React, { useState } from 'react'
import { Banner } from 'newlibs2050' 

export const Component = () => {
	const {userDetail} = useLMS()
	
	return <Banner 
                    onClick={() => {
		
	            }} 
                    onClose={()=>{// it will fire whenever user click on the close icon
                    }}
                />
}

```


| Parameter | Required? | Type       | Description                                                                                                                                                                                               |
|-----------|:---------:|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onClick |   false   | `function` | it will fire whenever user clicks on the button, it will return `type` and `contractUrl`.<br/>Available types: <br/>`REGISTER_FOR_FINANCING`<br/>`REVIEW_SIGN_CONTRACT`<br/>`REGISTER_AGAIN`<br/>`APPLY_FINANCING` |
| onClose |   false   | `function` | It will call when user click on the close icon                                                                                                                                                            |


<br/>
<br/>
<br/>
<br/>

## LoanList
```typescript jsx
import React, { useState } from 'react'
import { Banner } from 'newlibs2050' 

export const Component = () => {
	const {userDetail} = useLMS()
	
	return <LoanList onRecordPaymentClick={(loan) => {
		                // it will return you selected loan
	                 }} 
                         onViewClick={(type, loan) => {
						         // it will return you type : 'LOAN'|'APPLICATION' and selected loan detail
                         }} 
                         tableMaxHeight={300}
                />
}

```


| Parameter | Required? | Type       | Description                                                               |
|-----------|:---------:|------------|---------------------------------------------------------------------------|
| onRecordPaymentClick |   false   | `function` | It will return you selected loan                                          |
| onViewClick |   false   | `function` | it will return you type : ```LOAN``` or ```APPLICATION``` and selected loan |
| tableMaxHeight |   false   | `number`     | Table max height for both `Loan` and `Application`                        | 


<br/>
<br/>
<br/>
<br/>

## Hooks
### useLMS()
```const { TOKEN, BASE_URL, axiosInstance, EMAIL, setEmail, userDetail } = useLMS()```

| Name    | Description                                                                         |
|---------|-------------------------------------------------------------------------------------|
| TOKEN   | It will return current token                                                        |
| BASE_URL | It will return current base url                                                     |
|axiosInstance| You can use use axiosInstance, if you wanna call the server directly                |
|EMAIL| It will return current email                                                        |
|setEmail| if you wanna change the email you can call this function. setEmail('abc@gmail.com') |
|userDetail| it will return IBusiness type object.<br/> `IBusiness` - current user status        |


## Theme
Default Palette
```typescript
const palette = {
  primary: {
    "50": "#EBF5FF",
    "100": "#CCE5FF",
    "200": "#99CCFF",
    "300": "#66B2FF",
    "400": "#3399FF",
    "500": "#007FFF",
    "600": "#0066CC",
    "700": "#004C99",
    "800": "#004C99",
    "900": "#003A75",
    main: "#007FFF",
    light: "#66B2FF",
    dark: "#004C99",
    contrastText: "#fff",
  },
  secondary: {
    "50": "#F3F6F9",
    "100": "#E5EAF2",
    "200": "#DAE2ED",
    "300": "#C7D0DD",
    "400": "#B0B8C4",
    "500": "#9DA8B7",
    "600": "#6B7A90",
    "700": "#434D5B",
    "800": "#303740",
    "900": "#1C2025",
    main: "#DAE0E7",
    contrastText: "#2F3A46",
    light: "rgb(225, 230, 235)",
    dark: "rgb(152, 156, 161)",
  },
  divider: "#E5EAF2",
  primaryDark: {
    "50": "#EAEDF1",
    "100": "#DAE0E7",
    "200": "#ACBAC8",
    "300": "#7B91A7",
    "400": "#4B5E71",
    "500": "#3B4A59",
    "600": "#2F3A46",
    "700": "#1F262E",
    "800": "#141A1F",
    "900": "#101418",
    main: "#7B91A7",
  },
  common: { black: "#0B0D0E", white: "#fff" },
  text: {
    primary: "#1C2025",
    secondary: "#434D5B",
    tertiary: "#6B7A90",
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  grey: {
    "50": "#F3F6F9",
    "100": "#E5EAF2",
    "200": "#DAE2ED",
    "300": "#C7D0DD",
    "400": "#B0B8C4",
    "500": "#9DA8B7",
    "600": "#6B7A90",
    "700": "#434D5B",
    "800": "#303740",
    "900": "#1C2025",
    main: "#E5EAF2",
    contrastText: "#6B7A90",
    A100: "#f5f5f5",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
  },
  error: {
    "50": "#FFF0F1",
    "100": "#FFDBDE",
    "200": "#FFBDC2",
    "300": "#FF99A2",
    "400": "#FF7A86",
    "500": "#FF505F",
    "600": "#EB0014",
    "700": "#C70011",
    "800": "#94000D",
    "900": "#570007",
    main: "#EB0014",
    light: "#FF99A2",
    dark: "#C70011",
    contrastText: "#fff",
  },
  success: {
    "50": "#E9FBF0",
    "100": "#C6F6D9",
    "200": "#9AEFBC",
    "300": "#6AE79C",
    "400": "#3EE07F",
    "500": "#21CC66",
    "600": "#1DB45A",
    "700": "#1AA251",
    "800": "#178D46",
    "900": "#0F5C2E",
    main: "#1AA251",
    light: "#6AE79C",
    dark: "#1AA251",
    contrastText: "#fff",
  },
  warning: {
    "50": "#FFF9EB",
    "100": "#FFF3C1",
    "200": "#FFECA1",
    "300": "#FFDC48",
    "400": "#F4C000",
    "500": "#DEA500",
    "600": "#D18E00",
    "700": "#AB6800",
    "800": "#8C5800",
    "900": "#5A3600",
    main: "#DEA500",
    light: "#FFDC48",
    dark: "#AB6800",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  gradients: {
    lightGrayRadio:
      "radial-gradient(50% 50% at 50% 50%, #F0F7FF 0%, rgba(240, 247, 255, 0.05) 100%)",
    stylizedRadio:
      "linear-gradient(rgba(255 255 255 / 0.3), rgba(255 255 255 / 0.3)), linear-gradient(254.86deg, rgba(194, 224, 255, 0.12) 0%, rgba(194, 224, 255, 0.12) 0%, rgba(255, 255, 255, 0.3) 49.98%, rgba(240, 247, 255, 0.3) 100.95%)",
    linearSubtle:
      "linear-gradient(to top right, rgba(235, 245, 255, 0.3) 40%, rgba(243, 246, 249, 0.2) 100%)",
  },
  info: {
    main: "#0288d1",
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#fff",
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
  background: { paper: "#fff", default: "#fff" },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};
 
```
