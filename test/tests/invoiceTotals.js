const assert = require("assert");
const Factory = require("../../src/index.js");
const Handlebars = require("handlebars");
const _ = require("lodash");

const factory = new Factory({
  cbc: require("communibase-connector-js")
});

const expectedPartOfResults = {
  taxes: [
    {
      percentage: "6",
      total: "€ 160,30"
    },
    {
      percentage: "21",
      total: "€ 28,64"
    }
  ],
  taxesRounded: [
    {
      total: "€ 160,20",
      value: 160.2
    },
    {
      total: "€ 28,64",
      value: 28.64
    }
  ],
  totals: {
    inRounded: 2997.01,
    in: 2996.99
  },
  totalEx: "€ 2.808,05",
  totalIn: "€ 2.996,99"
};

const input = {
  _id: "54e590e9bc77cd1b00fc4dfe",
  invoiceNumber: "152613",
  date: "2015-02-18T23:00:00.000Z",
  debtorId: "5295c8c0fc70074504005643",
  debtorNumber: "220003",
  firstAddressLine: "De Haagsche Hogeschool",
  extraAddressLines: "T.a.v. de Crediteurenadministratie",
  comment: "",
  template:
    '{{totals.inRounded}} {{totals.in}} {{#each taxesRounded}}{{ total }}{{ value }}{{/each}}{{firstAddressLine}}{{#if extraAddressLines}}\n{{extraAddressLines}}{{/if}}{{#if address.property}}\n{{address.property}}{{/if}}\n{{address.street}} {{address.streetNumber}}{{address.streetNumberAddition}}\n{{address.zipcode}}  {{address.city}}\n{{#if address.notNl}}{{address.country}}{{/if}}\n</pre>\n<div style="font-weight: bold; white-space: pre-line;">&nbsp;</div>\n<div style="font-weight: bold; white-space: pre-line;"><br /><br /><br /></div>\n<div style="font-weight: bold; white-space: pre-line;"><span style="font-size: large; font-family: arial, helvetica, sans-serif;" data-mce-mark="1"><strong><span style="font-size: large; font-family: arial, helvetica, sans-serif;" data-mce-mark="1"><strong>{{#if isCredit}}CREDITFACTUUR{{/if}}{{#unless isCredit}}FACTUUR{{/unless}}</strong></span></strong></span></div>\n<div style="font-weight: bold; white-space: pre-line;">&nbsp;</div>\n<table style="border-collapse: collapse; float: left;">\n<tbody>\n<tr>\n<td style="font-weight: bold; width: 120px; padding-right: 5px;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">Factuurdatum:</span></td>\n<td style="width: 100px; text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">{{dateFormat date}}</span></td>\n</tr>\n<tr>\n<td style="font-weight: bold; padding-right: 5px; width: 120px;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">Debiteurnummer:</span></td>\n<td style="width: 100px; text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">{{debtorNumber}}</span></td>\n</tr>\n<tr>\n<td style="font-weight: bold; padding-right: 5px; width: 120px;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">Factuurnummer:</span></td>\n<td style="width: 100px; text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">{{invoiceNumber}}</span></td>\n</tr>\n<tr>\n<td style="font-weight: bold; padding-right: 5px; width: 120px;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">{{#if debtor.company.vatNumber}}<span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;">Uw btw-nummer:<br /><br /></span></span></td>\n<td style="width: 100px; text-align: left;"><span style="font-family: arial, helvetica, sans-serif; font-size: 9pt;"><span>{{debtor.company.vatNumber}}<br /><br /></span>{{/if}}</span></td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<table style="width: 100%; border-collapse: collapse;">\n<tbody>\n<tr><th style="border-top-width: 1px; border-top-style: solid; border-top-color: #000000; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #000000; text-align: left;"><span style="font-size: 9pt;">Omschrijving</span></th><th style="border-top-width: 1px; border-top-style: solid; border-top-color: #000000; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #000000; width: 40px; text-align: center;"><span style="font-size: 9pt;">Aantal</span></th><th style="width: 80px; border-top-width: 1px; border-top-style: solid; border-top-color: #000000; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #000000; text-align: right;"><span style="font-size: 9pt;">Prijs</span></th><th style="width: 40px; border-top-width: 1px; border-top-style: solid; border-top-color: #000000; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #000000; text-align: center; padding-right: 5px;"><span style="font-size: 9pt;">Btw</span></th><th style="width: 115px; border-top-width: 1px; border-top-style: solid; border-top-color: #000000; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #000000; text-align: right;"><span style="font-size: 9pt;">Bedrag excl. btw</span></th></tr>\n<tr>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{#invoiceItems}}{{description}}</span></td>\n<td style="vertical-align: text-top; white-space: nowrap; text-align: center;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{quantity}}&nbsp;</span></td>\n<td style="vertical-align: top; white-space: nowrap; text-align: right;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{totalPerUnitEx}}</span></td>\n<td style="vertical-align: text-top; white-space: nowrap; text-align: center;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{#if taxPercentage}} {{taxPercentage}}%{{/if}}</span></td>\n<td style="vertical-align: text-top; text-align: right; white-space: nowrap;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{totalEx}}</span></td>\n</tr>\n<tr>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{/invoiceItems}}</span></td>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td style="text-align: right;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n</tr>\n<tr>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif; white-space: pre-line;">{{comment}}</span></td>\n<td><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td style="border-bottom-width: 2px; border-bottom-style: solid; font-size: 2em; text-align: right; white-space: nowrap;"><span style="font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n</tr>\n<tr>\n<td style="text-align: right;" colspan="4"><span style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 9pt;">&nbsp;</span><span style="font-size: 9pt;"><strong>&nbsp;</strong></span><span style="font-size: 9pt;"><strong>&nbsp;</strong></span><span style="font-size: 9pt;"><strong><strong>Totaal excl. btw</strong></strong></span></span></td>\n<td style="text-align: right; white-space: nowrap;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;"><strong>{{totalEx}}{{#taxes}}</strong></span></td>\n</tr>\n<tr>\n<td style="text-align: right;" colspan="4"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{#if reverseChargedVat}}btw verlegd.{{/if}} {{#unless reverseChargedVat}}{{percentage}}% btw{{/unless}}</span></span></td>\n<td style="text-align: right;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">{{total}}{{/taxes}}</span></td>\n</tr>\n<tr style="height: 8px;">\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td style="text-align: right;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td style="text-align: right; height: 10px;"><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n</tr>\n<tr>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;"><strong>&nbsp;</strong></span></td>\n<td><span style="font-size: 9pt; font-family: arial, helvetica, sans-serif;">&nbsp;</span></td>\n<td style="text-align: right;" colspan="2"><span style="font-size: medium; font-family: arial, helvetica, sans-serif;"><span style="font-size: medium; font-family: arial, helvetica, sans-serif;">&nbsp;<span style="font-size: medium; font-family: arial, helvetica, sans-serif;">{{#if isCredit}}<strong>Te verrekenen</strong>{{/if}}{{#unless isCredit}}<span style="font-size: medium; font-family: arial, helvetica, sans-serif;"><strong>Te voldoen</strong></span>{{/unless}}</span></span></span></td>\n<td style="border-top-width: 1px; border-top-style: solid; border-bottom-width: 2px; border-bottom-style: solid; font-size: 2em; text-align: right; white-space: nowrap; height: 10px;"><span style="font-size: medium; font-family: arial, helvetica, sans-serif;"><strong>{{totalIn}}</strong></span></td>\n</tr>\n</tbody>\n</table>\n&nbsp;<br /><br /><br />{{#unless isCredit}}{{^compare paymentType "directDebit"}}<span style="font-size: 8pt;">Wij verzoeken u vriendelijk bovenstaand bedrag binnen 30 dagen over te maken op IBAN&nbsp;<strong>NL39 ABNA 0446 4511 85</strong>&nbsp;<br />en BIC <strong>ABNANL2A</strong>, onder vermelding van factuurnummer&nbsp;{{invoiceNumber}}&nbsp;en debiteurnummer&nbsp;{{debtorNumber}}.<span>{{/compare}}</span><span>{{#compare paymentType "directDebit"}}U heeft schriftelijke toestemming voor een incasso afgegeven. Het totaalbedrag wordt binnen 30 dagen van uw rekening afgeschreven.<span>{{/compare}}</span></span></span>{{/unless}}{{#if isCredit}}<span style="font-size: 8pt;"><strong>Let op:</strong>&nbsp;deze creditfactuur wordt verrekend met een openstaande factuur en hoeft derhalve&nbsp;<span style="text-decoration: underline;">niet</span>&nbsp;betaald te worden.{{/if}}</span></div>\n</div>\n</div>\n</body>\n</html>',
  openAmount: 2997.01,
  firstReminderDate: "2015-04-01T22:00:00.000Z",
  secondReminderDate: "2015-06-02T22:00:00.000Z",
  dayBookNumber: "30",
  creditInvoiceId: null,
  updatedAt: "2015-06-22T08:49:15.237Z",
  updatedBy: "Marja van den Hoek - (Client user 525bda45d77752d67c003117)",
  exportRuns: [
    {
      userLogin: "MarjavandenHoek",
      date: "2015-03-30T08:05:38.000Z",
      type: "cashFdebNew",
      _id: "551903f199d2d31d00637f82"
    },
    {
      userLogin: "MarjavandenHoek",
      date: "2015-03-30T08:21:22.000Z",
      type: "cashNew",
      _id: "5519079841bc551e007d6f44"
    }
  ],
  reverseChargedVat: false,
  isSent: false,
  origin: "Ngi-NGN",
  reminderCount: 1,
  invoiceItems: [
    {
      description:
        "Ngi-NGN Lidmaatschap - A. Andrioli - 211110 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4eb1",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c19",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e585191153794d100b87af",
            _id: "54e590eabc77cd1b00fc4eb2"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - A. Andrioli - 211110",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4eaf",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976139967e032f3c000e3f",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6a6ea932c75b09bdbe",
            _id: "54e590eabc77cd1b00fc4eb0"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - A. Andrioli - 211110",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4eae",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c19",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - C.J. Bakker - 100506 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4eac",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f051e6335104655000b3d",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5857e96107304db0b96bd",
            _id: "54e590eabc77cd1b00fc4ead"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Informatie Systemen - C.J. Bakker - 100506 - Contributie 2015",
      pricePerUnit: 4.13,
      generalLedgerAccountNumber: "8211",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4eaa",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a64c8d52d504007bba",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57f2277066600850a14e1",
            _id: "54e590eabc77cd1b00fc4eab"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - C.J. Bakker - 100506",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4ea8",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976136967e032f3c000e0d",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57daa0633fdc9c609ce5d",
            _id: "54e590eabc77cd1b00fc4ea9"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - C.J. Bakker - 100506",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4ea7",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f051e6335104655000b3d",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - H.G.J. Bechet-Tjoonk - 107029 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4ea5",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05206335104655000b49",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5857e0e1d07299c0b973b",
            _id: "54e590eabc77cd1b00fc4ea6"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Wetenschap en Educatie - H.G.J. Bechet-Tjoonk - 107029 - Contributie 2015",
      pricePerUnit: 4.13,
      generalLedgerAccountNumber: "8207",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4ea3",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a94c8d52d504007be1",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57fa34f581856e60a3c61",
            _id: "54e590eabc77cd1b00fc4ea4"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - H.G.J. Bechet-Tjoonk - 107029",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4ea1",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e1d",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57dab76972866d009ceb1",
            _id: "54e590eabc77cd1b00fc4ea2"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - H.G.J. Bechet-Tjoonk - 107029",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4ea0",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05206335104655000b49",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - F. Bögels - 105848 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e9e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bd1",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851762865f07490b8586",
            _id: "54e590eabc77cd1b00fc4e9f"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Utrecht - F. Bögels - 105848",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e9c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e17",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e580dc7a559cdc170a83cf",
            _id: "54e590eabc77cd1b00fc4e9d"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - F. Bögels - 105848",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e9b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bd1",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - C.J.J. van Diest - 104972 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e99",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f051f6335104655000b45",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5857e820b51112d0b9711",
            _id: "54e590eabc77cd1b00fc4e9a"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Informatie Systemen - C.J.J. van Diest - 104972 - Contributie 2015",
      pricePerUnit: 4.13,
      generalLedgerAccountNumber: "8211",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e97",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bcc",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57f22f19a1e29c00a1529",
            _id: "54e590eabc77cd1b00fc4e98"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - C.J.J. van Diest - 104972",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e95",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e15",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d8bdf80ad12a609c2c1",
            _id: "54e590eabc77cd1b00fc4e96"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - C.J.J. van Diest - 104972",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e94",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f051f6335104655000b45",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - T.W.M. van Gerwen - 108353 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e92",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05206335104655000b4b",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5857e2f242425780b9765",
            _id: "54e590eabc77cd1b00fc4e93"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Informatie Systemen - T.W.M. van Gerwen - 108353 - Contributie 2015",
      pricePerUnit: 4.13,
      generalLedgerAccountNumber: "8211",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e90",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a94c8d52d504007be4",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57f2231e34387820a1553",
            _id: "54e590eabc77cd1b00fc4e91"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Rotterdam - T.W.M. van Gerwen - 108353",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e8e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e1f",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e582b0123c0c66ac0aee99",
            _id: "54e590eabc77cd1b00fc4e8f"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - T.W.M. van Gerwen - 108353",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e8d",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05206335104655000b4b",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - A.F. van Gorp - 301485 - Contributie 2015 - Ordernummer: INET147692",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e8b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5485848dc4908c3900f37c12",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e589fee5ab947b790c0a2e",
            _id: "54e590eabc77cd1b00fc4e8c"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Future Centers - A.F. van Gorp - 301485 - Contributie 2015 - Ordernummer: INET147692",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8228",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e89",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "548584c683b6f31c00133243",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e581bbd5da76af220aaf5a",
            _id: "54e590eabc77cd1b00fc4e8a"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description:
        "Regio Den Haag - A.F. van Gorp - 301485 - Ordernummer: INET147692",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e87",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5485845c83b6f31c001331eb",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57db8cbbbf4b00609cfcc",
            _id: "54e590eabc77cd1b00fc4e88"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Digitale Transformatie - A.F. van Gorp - 301485 - Contributie 2015 - Ordernummer: INET147692",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8227",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e85",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "548584d4723002330046caed",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57a5ec966d273f904b26b",
            _id: "54e590eabc77cd1b00fc4e86"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - A.F. van Gorp - 301485",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e84",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5485848dc4908c3900f37c12",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - N.J.J. Groot - 105913 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e82",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a94c8d52d504007bdd",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e585181659170a760b85da",
            _id: "54e590eabc77cd1b00fc4e83"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Rotterdam - N.J.J. Groot - 105913",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e80",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e1b",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e582deff49fbce940af667",
            _id: "54e590eabc77cd1b00fc4e81"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - N.J.J. Groot - 105913",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e7f",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a94c8d52d504007bdd",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - H. Grootveld - 301441 - Contributie 2015 - Ordernummer: INET 150684",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e7d",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5423c3cc7b53865f00c171a4",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e589e7c232853bc10c0996",
            _id: "54e590eabc77cd1b00fc4e7e"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Regio Den Haag - H. Grootveld - 301441 - Ordernummer: INET 150684",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e7b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "542bc955872b4f1f00767589",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d9691e257ba5709c306",
            _id: "54e590eabc77cd1b00fc4e7c"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - H. Grootveld - 301441",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e7a",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5423c3cc7b53865f00c171a4",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - G.C.M. Heijne - 115036 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e78",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602aa4c8d52d504007bf1",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e585187fd2db770c0b862e",
            _id: "54e590eabc77cd1b00fc4e79"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - G.C.M. Heijne - 115036",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e76",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e25",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d692bda2db81709bc44",
            _id: "54e590eabc77cd1b00fc4e77"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - G.C.M. Heijne - 115036",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e75",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602aa4c8d52d504007bf1",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - J.J. van der Hoek - 103588 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e73",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bc9",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58517b21e8ef8600b855c",
            _id: "54e590eabc77cd1b00fc4e74"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Utrecht - J.J. van der Hoek - 103588",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e71",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e13",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e580dc6bd521962c0a83a5",
            _id: "54e590eabc77cd1b00fc4e72"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - J.J. van der Hoek - 103588",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e70",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bc9",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - H. Joosten - 115037 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e6e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ab4c8d52d504007bf3",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851858003413140b8658",
            _id: "54e590eabc77cd1b00fc4e6f"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - H. Joosten - 115037",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e6c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e27",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d691f4b51380c09bc6e",
            _id: "54e590eabc77cd1b00fc4e6d"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - H. Joosten - 115037",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e6b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ab4c8d52d504007bf3",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - M.D. Karel - 211111 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e69",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c1d",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851ac4bbe3c8e10b87da",
            _id: "54e590eabc77cd1b00fc4e6a"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - M.D. Karel - 211111",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e67",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976139967e032f3c000e41",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6a3ae79a9c2709bde8",
            _id: "54e590eabc77cd1b00fc4e68"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - M.D. Karel - 211111",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e66",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c1d",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - L.C.M. van Koppen - 210370 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e64",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05216335104655000b4f",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e586a31bb23292a50babb0",
            _id: "54e590eabc77cd1b00fc4e65"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Informatiebeveiliging - L.C.M. van Koppen - 210370 - Contributie 2015",
      pricePerUnit: 16.53,
      generalLedgerAccountNumber: "8203",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e62",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f226badc37d0d41000305",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58ba0301232c9590c52c1",
            _id: "54e590eabc77cd1b00fc4e63"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description:
        "SIG Beheer en Servicemanagement - L.C.M. van Koppen - 210370 - Contributie 2015",
      pricePerUnit: 12.4,
      generalLedgerAccountNumber: "8202",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e60",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c09",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e581dca23ae0c7150abbcc",
            _id: "54e590eabc77cd1b00fc4e61"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - L.C.M. van Koppen - 210370",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e5e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e35",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6a15ba7f399509bd6a",
            _id: "54e590eabc77cd1b00fc4e5f"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - L.C.M. van Koppen - 210370",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e5d",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05216335104655000b4f",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - J.P. van Leeuwen - 115039 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e5b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ab4c8d52d504007bf7",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58519734b4e476a0b8682",
            _id: "54e590eabc77cd1b00fc4e5c"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - J.P. van Leeuwen - 115039",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e59",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e29",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d694531fb3dec09bc98",
            _id: "54e590eabc77cd1b00fc4e5a"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - J.P. van Leeuwen - 115039",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e58",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ab4c8d52d504007bf7",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - A.M.J.J. Lousberg-Orbons - 115041 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e56",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ab4c8d52d504007bfa",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851974ab30fbfc0b86ad",
            _id: "54e590eabc77cd1b00fc4e57"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - A.M.J.J. Lousberg-Orbons - 115041",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e54",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e2b",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d69e030dea83e09bcc2",
            _id: "54e590eabc77cd1b00fc4e55"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - A.M.J.J. Lousberg-Orbons - 115041",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e53",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ab4c8d52d504007bfa",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - E.F. Meijer - 300135 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e51",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529603084c8d52d5040085d3",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58535cee641dada0b8b48",
            _id: "54e590eabc77cd1b00fc4e52"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - E.F. Meijer - 300135",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e4f",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976166967e032f3c001259",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d5cb988c82dba09ba56",
            _id: "54e590eabc77cd1b00fc4e50"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - E.F. Meijer - 300135",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590eabc77cd1b00fc4e4e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529603084c8d52d5040085d3",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - W.A. van Noort - 210797 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e4c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c0f",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851997470b7a8f0b8784",
            _id: "54e590e9bc77cd1b00fc4e4d"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - W.A. van Noort - 210797",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e4a",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976139967e032f3c000e39",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6aaa5b062ce809bd94",
            _id: "54e590e9bc77cd1b00fc4e4b"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - W.A. van Noort - 210797",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e49",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c0f",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - R.L. Pouw - 300206 - Contributie 2015 - Ordernummer: INET 150685",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e47",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f057b6335104655000ecd",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e587af734a62e2e70bbcaa",
            _id: "54e590e9bc77cd1b00fc4e48"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Informatie Management - R.L. Pouw - 300206 - Contributie 2015 - Ordernummer: INET 150685",
      pricePerUnit: 24.8,
      generalLedgerAccountNumber: "8206",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e45",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529603104c8d52d5040086bb",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58443064684d7610b396a",
            _id: "54e590e9bc77cd1b00fc4e46"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description:
        "SIG Governance - R.L. Pouw - 300206 - Contributie 2015 - Ordernummer: INET 150685",
      pricePerUnit: 12.4,
      generalLedgerAccountNumber: "8214",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e43",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52a8751d1d0d8af82400160e",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57e8763fd282e3f09fdef",
            _id: "54e590e9bc77cd1b00fc4e44"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description:
        "Regio Utrecht - R.L. Pouw - 300206 - Ordernummer: INET 150685",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e41",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5297616b967e032f3c0012cb",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e580e61691759ad20a86cc",
            _id: "54e590e9bc77cd1b00fc4e42"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - R.L. Pouw - 300206",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e40",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f057b6335104655000ecd",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - A.G.P. Pronk - 211919 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e3e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602f14c8d52d504008321",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e585320c0eb825b20b8ad9",
            _id: "54e590e9bc77cd1b00fc4e3f"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - A.G.P. Pronk - 211919",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e3c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976159967e032f3c001125",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57dabfcc548848709cf67",
            _id: "54e590e9bc77cd1b00fc4e3d"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - A.G.P. Pronk - 211919",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e3b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602f14c8d52d504008321",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - M. Reijnhoudt - 103021 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e39",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f051f6335104655000b43",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5857e3048f2a1ca0b96e7",
            _id: "54e590e9bc77cd1b00fc4e3a"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Wetenschap en Educatie - M. Reijnhoudt - 103021 - Contributie 2015",
      pricePerUnit: 4.13,
      generalLedgerAccountNumber: "8207",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e37",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a74c8d52d504007bc4",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57fc0b04165c67b0a404b",
            _id: "54e590e9bc77cd1b00fc4e38"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - M. Reijnhoudt - 103021",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e35",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5297609f967e032f3c000073",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d38ce2d6c210709a98e",
            _id: "54e590e9bc77cd1b00fc4e36"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - M. Reijnhoudt - 103021",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e34",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f051f6335104655000b43",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - P.A. Ritman - 210960 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e32",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05216335104655000b51",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58583d9f36d2d590b978f",
            _id: "54e590e9bc77cd1b00fc4e33"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Informatie Management - P.A. Ritman - 210960 - Contributie 2015",
      pricePerUnit: 24.8,
      generalLedgerAccountNumber: "8206",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e30",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c11",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e584366712d56d1f0b3838",
            _id: "54e590e9bc77cd1b00fc4e31"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description:
        "SIG Informatie Systemen - P.A. Ritman - 210960 - Contributie 2015",
      pricePerUnit: 4.13,
      generalLedgerAccountNumber: "8211",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e2e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f22bbadc37d0d410004cb",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57f24bfe2d74fb90a16ae",
            _id: "54e590e9bc77cd1b00fc4e2f"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - P.A. Ritman - 210960",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e2c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976139967e032f3c000e3b",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57dabd7f3b261a809cedb",
            _id: "54e590e9bc77cd1b00fc4e2d"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - P.A. Ritman - 210960",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e2b",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05216335104655000b51",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - G. de Ruiter - 111543 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e29",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602aa4c8d52d504007be9",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e58518a283cdc6050b8604",
            _id: "54e590e9bc77cd1b00fc4e2a"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - G. de Ruiter - 111543",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e27",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e21",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d696d8dd2db1009bc1a",
            _id: "54e590e9bc77cd1b00fc4e28"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - G. de Ruiter - 111543",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e26",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602aa4c8d52d504007be9",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - J.D. Schagen - 210482 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e24",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c0d",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e585191776dc8dc50b8759",
            _id: "54e590e9bc77cd1b00fc4e25"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - J.D. Schagen - 210482",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e22",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976139967e032f3c000e37",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d5ae22741103209b99c",
            _id: "54e590e9bc77cd1b00fc4e23"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - J.D. Schagen - 210482",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e21",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ad4c8d52d504007c0d",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - A.M. Schipper - 115049 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e1f",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c00",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851974ef69bf900b86d8",
            _id: "54e590e9bc77cd1b00fc4e20"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - A.M. Schipper - 115049",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e1d",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e2d",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6a25b43b772409bcec",
            _id: "54e590e9bc77cd1b00fc4e1e"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - A.M. Schipper - 115049",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e1c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c00",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - H.F. Schouten - 300325 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e1a",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05886335104655000f47",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5871cce94e06b980bb1f7",
            _id: "54e590e9bc77cd1b00fc4e1b"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Architectuur - H.F. Schouten - 300325 - Contributie 2015",
      pricePerUnit: 8.26,
      generalLedgerAccountNumber: "8210",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e18",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5296031e4c8d52d504008847",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5817c3d8d9414c10aa999",
            _id: "54e590e9bc77cd1b00fc4e19"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - H.F. Schouten - 300325",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e16",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976174967e032f3c001399",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6ca00dd15c0409bf6f",
            _id: "54e590e9bc77cd1b00fc4e17"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - H.F. Schouten - 300325",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e15",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f05886335104655000f47",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - L.M. Tromp - 115050 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e13",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c02",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851949919b71680b8703",
            _id: "54e590e9bc77cd1b00fc4e14"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - L.M. Tromp - 115050",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e11",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e2f",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6a0948e6e0df09bd16",
            _id: "54e590e9bc77cd1b00fc4e12"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - L.M. Tromp - 115050",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e10",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c02",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - G.E. in 't Veld - 300242 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e0e",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f057e6335104655000ee9",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e586dc60699730f20bae66",
            _id: "54e590e9bc77cd1b00fc4e0f"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "SIG Governance - G.E. in 't Veld - 300242 - Contributie 2015",
      pricePerUnit: 12.4,
      generalLedgerAccountNumber: "8214",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e0c",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529603154c8d52d50400873f",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57e78d369cfafde09fc0b",
            _id: "54e590e9bc77cd1b00fc4e0d"
          }
        ]
      },
      taxPercentage: 21,
      quantity: 1
    },
    {
      description: "Regio Den Haag - G.E. in 't Veld - 300242",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e0a",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "5297616e967e032f3c001307",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6c0acd47e11d09bf47",
            _id: "54e590e9bc77cd1b00fc4e0b"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - G.E. in 't Veld - 300242",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e09",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529f057e6335104655000ee9",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - P.R. de Vries - 115052 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e07",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c04",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e585199a364b09700b872e",
            _id: "54e590e9bc77cd1b00fc4e08"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - P.R. de Vries - 115052",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e05",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976138967e032f3c000e31",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d6a6094e5fe3209bd40",
            _id: "54e590e9bc77cd1b00fc4e06"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - P.R. de Vries - 115052",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e04",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602ac4c8d52d504007c04",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "Ngi-NGN Lidmaatschap - H.P. Weenink - 105849 - Contributie 2015",
      pricePerUnit: 139.15,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e02",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bd5",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e5851875346fce7e0b85b0",
            _id: "54e590e9bc77cd1b00fc4e03"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description: "Regio Den Haag - H.P. Weenink - 105849",
      pricePerUnit: 0,
      generalLedgerAccountNumber: "8010",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4e00",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "52976137967e032f3c000e19",
        path: [
          {
            field: "invoicedPeriods",
            objectId: "54e57d69e623b9979a09bbf0",
            _id: "54e590e9bc77cd1b00fc4e01"
          }
        ]
      },
      taxPercentage: 6,
      quantity: 1
    },
    {
      description:
        "36% staffelkorting voor Ngi-NGN Lidmaatschap - H.P. Weenink - 105849",
      pricePerUnit: -50.094,
      generalLedgerAccountNumber: "8080",
      costCentre: "",
      _id: "54e590e9bc77cd1b00fc4dff",
      documentReference: {
        _id: null,
        rootDocumentEntityType: "Membership",
        rootDocumentId: "529602a84c8d52d504007bd5",
        path: []
      },
      taxPercentage: 6,
      quantity: 1
    }
  ],
  paymentType: "invoice",
  address: {
    street: "Johanna Westerdijkplein",
    streetNumber: "75",
    streetNumberAddition: "",
    zipcode: "2521 EN",
    city: "DEN HAAG",
    latitude: 0,
    longitude: 0,
    property: "",
    type: "visit",
    countryCode: "NL"
  }
};

describe("#invoiceTotals rounds correctly", () => {
  it("will give various totals", done => {
    factory
      .getPromise("Invoice", input, Handlebars.parse(input.template))
      .then(actual => {
        _.each(expectedPartOfResults, (expected, identifier) => {
          assert.deepEqual(
            actual[identifier],
            expected,
            `totals.${identifier} differ from expected${JSON.stringify(
              actual[identifier]
            )}${JSON.stringify(expected)}`
          );
        });

        done();
      })
      .catch(done);
  });
});
