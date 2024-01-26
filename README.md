# Rubic Widget


<img src="https://github.com/Cryptorubic/rubic-widget/blob/update-widget/src/assets/iframe.png" width="390" height="681" alt="Iframe screen">


## Get started

1. Put this script tag to the `<head>` of your page 
```html
<script type="text/javascript" src="https://new-widgets.rubic.exchange/iframe/bundle.new-app.min.js"></script>
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
        iframe: 'true',
        hideSelectionFrom: false,
        hideSelectionTo: true,
        theme: 'dark',
        injectTokens: {
            eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518']
        },
        slippagePercent: {
            instantTrades: 2,
            crossChain: 5
        },
        crossChainIntegratorAddress: '<Your integrator address>',
        onChainIntegratorAddress: '<Your integrator address>'
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

| Parameter                     | Possible values                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default | Description                                                                                                                                                                                                             |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `from`                        | Token symbol (e.g. 'ETH', 'RBC') or address (e.g. '0x32Be343B94f860124dC4fEe278FDCBD38C102D88')                                                                                                                                                                                                                                                                                                                                                 | `ETH`   | Can be used to specify tokens to trade.                                                                                                                                                                                 |
| `to`                          | Token symbol (e.g. 'ETH', 'RBC') or address (e.g. '0x32Be343B94f860124dC4fEe278FDCBD38C102D88')                                                                                                                                                                                                                                                                                                                                                 | `RBC`   | Can be used to specify tokens to trade.                                                                                                                                                                                 |
| `fromChain`                   | 'ETH', 'BSC', 'AVALANCHE', 'POLYGON', 'ARBITRUM', 'LINEA' etc                                                                                                                                                                                                                                                                                                                                                                                   | `ETH`   | Can be used to specify chain to trade.                                                                                                                                                                                  |
| `toChain`                     | 'ETH', 'BSC', 'AVALANCHE', 'POLYGON', 'ARBITRUM', 'LINEA', 'XDAI' etc                                                                                                                                                                                                                                                                                                                                                                           | `ETH`   | Can be used to specify chain to trade.                                                                                                                                                                                  |
| `amount`                      | Floating point number, e.g. `1.2345`                                                                                                                                                                                                                                                                                                                                                                                                            | `1`     | Can be used to specify base trade amount.                                                                                                                                                                               |
| `iframe`                      | 'true', 'false'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `flex`  | Can be used to specify widget appearance. flex -- the widget adjusts to the rubic-widget-rootcontainer size: if the width of the container is less than 1180px, then the widget is vertical, otherwise it is horizontal |
| `hideSelectionFrom`           | 'true', 'false'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `false` | Allows you to block the selection of tokens on the form. Thus, it will be possible to exchange only the tokens specified in the parameters.                                                                             |
| `hideSelectionTo`             | 'true', 'false'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `true`  | Allows you to block the selection of tokens on the form. Thus, it will be possible to exchange only the tokens specified in the parameters.                                                                             |
| `theme`                       | 'dark', 'light'                                                                                                                                                                                                                                                                                                                                                                                                                                 | `dark`  | Can be used to specify the theme of the visual design.                                                                                                                                                                  |
| `language`                    | 'en', 'es', 'ko', 'ru', 'zh'                                                                                                                                                                                                                                                                                                                                                                                                                    | `en`    | Allows you to set widget language.                                                                                                                                                                                      |
| `injectTokens`                | Object whose array properties contain addresses or symbols of tokens that must be added to the list of tokens available for selection (initially, the list contains only a few basic tokens for each blockchain). Available property keys: `eth`, `bsc`, `polygon`, `avalanche`, `arbitrum`, `linea`  e.g.  ``` {     eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518', 'CRV'],     bsc: ['0x2859e4544c4bb03966803b044a93563bd2d0dd4d'] } ``` | `{}`    | Allows you to add your tokens to the tokens selection list inside widget.                                                                                                                                               |
| `slippagePercent`             | Object whose key properties contain default slippage percent. Minimum value is 0.1, maximum value is 50. Available property keys: `instantTrades`, `crossChain`, e.g. ```{ instantTrades: 5, crossChain: 7 }```                                                                                                                                                                                                                                 | `{}`    | Allows you to set default slippage for Instant Trades and Multi-Chain swaps.                                                                                                                                            |
| `crossChainIntegratorAddress` | Yor integrator address for cross chain fee (e.g. `0xecA0A3eFCf009519052Dc92306fE821b9c7A32A2`)                                                                                                                                                                                                                                                                                                                                                  | not set | Allows you to charge fee from every swap, means fee percent (e.g. 0.1 is 0.1%). Not required. If not set, swaps will be without fee. If set, property feeTarget must be set too.                                        |
| `onChainIntegratorAddress`    | Yor integrator address for on chain fee (e.g. `0xecA0A3eFCf009519052Dc92306fE821b9c7A32A2`)                                                                                                                                                                                                                                                                                                                                                     | not set | Target address to charge fee to. Not required if fee property not set. If set, property fee must be set too.                                                                                                            |
| `whitelistOnChain`            | ['izumi', 'jupiter', ...]                                                                                                                                                                                                                                                                                                                                                                                                                       | not set | List of available providers for on-chain swap.                                                                                                                                                                          |
| `whitelistCrossChain`         | ['lifi', 'changenow', ...]                                                                                                                                                                                                                                                                                                                                                                                                                      | not set | List of available providers for cross-chain swap.                                                                                                                                                                       |
| `blacklistOnChain`            | ['izumi', 'jupiter', ...]                                                                                                                                                                                                                                                                                                                                                                                                                       | not set | List of unavailable providers for on-chain swap.                                                                                                                                                                        |
| `blacklistCrossChain`         | ['lifi', 'changenow', ...]                                                                                                                                                                                                                                                                                                                                                                                                                      | not set | List of unavailable providers for cross-chain swap.                                                                                                                                                                     |


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
        
        // remove old widget and recreate new with light configuration
        rubicWidget.init(newConfiguration);
    } else {
        // remove old widget and recreate new with dark configuration
        rubicWidget.init(newConfiguration);
    }
}
```
