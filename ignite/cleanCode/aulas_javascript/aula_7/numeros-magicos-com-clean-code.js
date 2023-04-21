//Simples
    function lookForUpdates() {}
    const INTERVAL_30_MINUTES = 60 * 30 * 1000;

    //Pode se utilizar o clean code das seguintes formas:
    //Sempre deixando claro o valor que será encontrado com o cálculo
    //Criando uma constante
    setInterval(lookForUpdates, INTERVAL_30_MINUTES);

    //Deixando um comentário
    setInterval(lookForUpdates, 60 * 30 * 1000); //30 minutos

//Avançado
    function calculateDiscount(priceInCents, discountAmountInPercentage) {
        return {
            discountInCents: priceInCents * discountAmountInPercentage / 100,
        };
    }
    var res = calculateDiscount(100, 20).discountInCents;
    console.log(res)
