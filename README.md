![alt text](https://github.com/Cryptorubic/rubic-frontend/blob/master/src/assets/images/rubic-logo.svg "Rubic — Multichain DeFi platform")

# Rubic Widget


![alt text](https://github.com/Cryptorubic/rubic-widget/blob/master/src/assets/iframe.png "")


## Get started

1. Put this script tag to the `<head>` of your page 
```html
<script type="text/javascript" src="https://widgets.rubic.exchange/iframe/bundle.min.js"></script>
```

2. Put this `div` tag to the place, where the Rubic Widget will be
```html
<div id="rubic-widget-root"></div>
```

3. Put this script tag to the bottom of `<body>`
```html
<script defer type="text/javascript">
    // describe widget configuration and saving to a global variable for future use
    var configuration = {
        from: 'ETH',
        to: 'RBC',
        fromChain: 'ETH',
        toChain: 'ETH',
        amount: 1,
        iframe: 'flex',
        hideSelectionFrom: false,
        hideSelectionTo: true,
        theme: 'dark',
        background: '#28372e',
        injectTokens: {
            eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518'],
            bsc: ['0x8aed24bf6e0247be51c57d68ad32a176bf86f4d9']
        },
        slippagePercent: {
            instantTrades: 2,
            crossChain: 5
        },
        promoCode: 'srTqRKUz',
        fee: 0.075,
        feeTarget: '0xecA0A3eFCf009519052Dc92306fE821b9c7A32A2'
    }

    // prevent accidental changes to the object, for example, when re-creating a widget for another theme
    Object.freeze(configuration);

    // create widget
    rubicWidget.init(configuration);
</script>
```

> ⚠️ **You should enter tokens addresses in ethereum checksum format.** To avoid errors, copy the token address from a blockchain explorer, for example, [etherscan](https://etherscan.io/).

You can customize the configuration parameters the way you want. Below is a description of the options available.

## Available configuration parameters

| Parameter           | Possible values                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default                                                                                                                 | Description                                                                                                                                                                                                             |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `from`              | Token symbol (e.g. 'ETH', 'RBC') or address (e.g. '0x32Be343B94f860124dC4fEe278FDCBD38C102D88')                                                                                                                                                                                                                                                                                                                                                 | `ETH`                                                                                                                   | Can be used to specify tokens to trade.                                                                                                                                                                                 |
| `to`                | Token symbol (e.g. 'ETH', 'RBC') or address (e.g. '0x32Be343B94f860124dC4fEe278FDCBD38C102D88')                                                                                                                                                                                                                                                                                                                                                 | `RBC`                                                                                                                   | Can be used to specify tokens to trade.                                                                                                                                                                                 |
| `fromChain`         | 'ETH', 'BSC', 'POLYGON', 'HARMONY', 'FANTOM', 'MOONRIVER'                                                                                                                                                                                                                                                                                                                                                                                       | `ETH`                                                                                                                   | Can be used to specify chain to trade.                                                                                                                                                                                  |
| `toChain`           | 'ETH', 'BSC', 'POLYGON', 'HARMONY', 'FANTOM', 'MOONRIVER', 'XDAI'                                                                                                                                                                                                                                                                                                                                                                               | `ETH`                                                                                                                   | Can be used to specify chain to trade.                                                                                                                                                                                  |
| `amount`            | Floating point number, e.g. `1.2345`                                                                                                                                                                                                                                                                                                                                                                                                            | `1`                                                                                                                     | Can be used to specify base trade amount.                                                                                                                                                                               |
| `iframe`            | 'flex', 'vertical', 'horizontal'                                                                                                                                                                                                                                                                                                                                                                                                                | `flex`                                                                                                                  | Can be used to specify widget appearance. flex -- the widget adjusts to the rubic-widget-rootcontainer size: if the width of the container is less than 1180px, then the widget is vertical, otherwise it is horizontal |
| `hideSelectionFrom` | 'true', 'false'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `false`                                                                                                                 | Allows you to block the selection of tokens on the form. Thus, it will be possible to exchange only the tokens specified in the parameters.                                                                             |
| `hideSelectionTo`   | 'true', 'false'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `true`                                                                                                                  | Allows you to block the selection of tokens on the form. Thus, it will be possible to exchange only the tokens specified in the parameters.                                                                             |
| `theme`             | 'dark', 'light'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `dark`                                                                                                                  | Can be used to specify the theme of the visual design.                                                                                                                                                                  |
| `background`        | values of css `background` property, e.g.'#28372e', 'white', 'linear-gradient(45deg, black, #4aa956)'                                                                                                                                                                                                                                                                                                                                           | `linear-gradient(45deg, black, #4aa956)` with dark theme, `linear-gradient(45deg, #4aa956 20%, white)` with light theme | Allows you to set the background in widget outside the trade form.                                                                                                                                                      |
| `language`          | 'en', 'es', 'ko', 'ru', 'zh'                                                                                                                                                                                                                                                                                                                                                                                                                    | `en`                                                                                                                    | Allows you to set widget language.                                                                                                                                                                                      |
| `injectTokens`      | Object whose array properties contain addresses or symbols of tokens that must be added to the list of tokens available for selection (initially, the list contains only a few basic tokens for each blockchain). Available property keys: `eth`, `bsc`, `polygon`, `harmony`, `fantom`, `moonriver`  e.g.  ``` {     eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518', 'CRV'],     bsc: ['0x2859e4544c4bb03966803b044a93563bd2d0dd4d'] } ``` | `{}`                                                                                                                    | Allows you to add your tokens to the tokens selection list inside widget.                                                                                                                                               |
| `slippagePercent`   | Object whose key properties contain default slippage percent. Minimum value is 0.1, maximum value is 50. Available property keys: `instantTrades`, `crossChain`, e.g. ```{ instantTrades: 5, crossChain: 7 }```                                                                                                                                                                                                                                 | `{}`                                                                                                                    | Allows you to set default slippage for Instant Trades and Multi-Chain swaps.                                                                                                                                            |
| `promoCode`         | string value                                                                                                                                                                                                                                                                                                                                                                                                                                    | not set                                                                                                                 | Referal program promo code. Not required. If set, properties fee and feeTarget must be set. More details: https://rubic.exchange/referral .                                                                             |
| `fee`               | 0.075                                                                                                                                                                                                                                                                                                                                                                                                                                           | not set                                                                                                                 | Allows you to charge fee from every swap, means fee percent (e.g. 0.1 is 0.1%). Not required. If not set, swaps will be without fee. If set, property feeTarget must be set too.                                        |
| `feeTarget`         | ethereum-compatible address (e.g. `0xecA0A3eFCf009519052Dc92306fE821b9c7A32A2`)                                                                                                                                                                                                                                                                                                                                                                 | not set                                                                                                                 | Target address to charge fee to. Not required if fee property not set. If set, property fee must be set too.                                                                                                            |


## Dynamic change parameters
You can change the theme of the widget when changing the theme on your site, or any other parameters dynamically.
To do this, call the init method again with the updated configuration. The previous widget will be deleted and a new one will be created instead.

### Change widget theme when site theme changing
```javascript
function onThemeChange(newTheme){
    // copy base dark configuration
    const newConfiguration = { ...configuration };

    if(newTheme === 'light'){
        // modify configuration for the light theme. You can change any properties
        newConfiguration.theme = 'light';
        newConfiguration.background = 'white';
        
        // remove old widget and recreate new with light configuration
        rubicWidget.init(newConfiguration);
    } else {
        // remove old widget and recreate new with dark configuration
        rubicWidget.init(newConfiguration);
    }
}
```

## Use with SSR
Remember that when using server-side rendering, the script with the widget setting must be executed on the client-side. When adding the widget initialization code, make sure that it will only be executed on the client.

For example, if you use NuxtJs you should use the following code to initialize the widget:

```javascript
<script>
    if (process.browser) {
        window.onNuxtReady(() => {
            // describe widget configuration and saving to a global variable for future use
            var configuration = {
                from: 'ETH',
                to: 'RBC',
                fromChain: 'ETH',
                toChain: 'ETH',
                amount: 1,
                iframe: 'flex',
                hideSelectionFrom: false,
                hideSelectionTo: true,
                theme: 'dark',
                background: '#28372e',
                injectTokens: {
                    eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518'],
                    bsc: ['0x8aed24bf6e0247be51c57d68ad32a176bf86f4d9']
                },
                slippagePercent: {
                    instantTrades: 2,
                    crossChain: 5
                },
                promoCode: 'a1bc4da1f2',
                fee: 0.1,
                feeTarget: '0xecA0A3eFCf009519052Dc92306fE821b9c7A32A2'
            }
    
            // prevent accidental changes to the object, for example, when re-creating a widget for another theme
            Object.freeze(configuration);
    
            // create widget
            rubicWidget.init(configuration);
        })
    }
</script>
```

## Stop resize listeners
If you want to remove resize observer and scroll listeners with `iframe: flex` configuration, you can call `rubicWidget.disable()`. After that you will be abel to recreate widget via `rubicWidget.init(configuration)`
