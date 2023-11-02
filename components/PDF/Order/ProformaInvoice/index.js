import moment from 'moment'
import {
  Page,
  View,
  Text,
  Font,
  Document,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'

const ProformaInvoice = ({ proformaInvoice }) => (
  <Document>
    <Page size="A4" style={styles.body}>
      <View>
        <Image style={styles.imageLogo} src="/img/exepart-gradient.png" />
        <Text style={styles.title}>PROFORMA INVOICE</Text>
      </View>
      <View style={styles.sectionItemDetail}>
        <View style={styles.leftColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>From</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subItem}>{proformaInvoice.from.name}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Address</Text>
            <Text style={styles.subItem}>: {proformaInvoice.from.address}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Contact Name</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.from.contact_name}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Phone Number</Text>
            <Text style={styles.subItem}>: {proformaInvoice.from.phone}</Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>PI Number</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.proforma_invoice_info.number}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>PI Date</Text>
            <Text style={styles.subItem}>
              :{' '}
              {moment(proformaInvoice.proforma_invoice_info.date).format(
                'dddd, D MMMM YYYY'
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionItemDetail}>
        <View style={styles.leftColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Bill To</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.subItem}>{proformaInvoice.bill_to.name}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Address</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.bill_to.address}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Contact Name</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.bill_to.contact_name}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Phone Number</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.bill_to.phone}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>E-mail</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.bill_to.email}
            </Text>
          </View>
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Pick Up From</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Company Name</Text>
            <Text style={styles.subItem}>: {proformaInvoice.ship_to.name}</Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Address</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.ship_to.address}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Contact Name</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.ship_to.contact_name}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>Phone Number</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.ship_to.phone}
            </Text>
          </View>
          <View style={styles.inlineItem}>
            <Text style={styles.sectionSubTitle}>E-mail</Text>
            <Text style={styles.subItem}>
              : {proformaInvoice.ship_to.email}
            </Text>
          </View>
        </View>
      </View>

      {/* table */}
      <View>
        <View style={styles.tableHead}>
          <Text style={styles.pn}>P/N</Text>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.mfg}>Mfg</Text>
          <Text style={styles.dc}>DC</Text>
          <Text style={styles.qty}>Quantity</Text>
          <Text style={styles.unitPrice}>Unit Price (USD)</Text>
          <Text style={styles.total}>Total (USD)</Text>
        </View>
        <View style={styles.tableBody}>
          <Text style={styles.pn}>{proformaInvoice.table_data.pn}</Text>
          <Text style={styles.description}>
            {proformaInvoice.table_data.description}
          </Text>
          <Text style={styles.mfg}>{proformaInvoice.table_data.mfg}</Text>
          <Text style={styles.dc}>{proformaInvoice.table_data.datecode}</Text>
          <Text style={styles.qty}>{proformaInvoice.table_data.qty}</Text>
          <Text style={styles.unitPrice}>
            {proformaInvoice.table_data.unit_price}
          </Text>
          <Text style={styles.total}>{proformaInvoice.table_data.total}</Text>
        </View>
        <View style={{ margin: 5 }}></View>
        <View style={styles.tableBody}>
          <Text style={styles.pn}></Text>
          <Text style={styles.description}></Text>
          <Text style={styles.mfg}></Text>
          <Text style={styles.dc}></Text>
          <Text style={styles.qty}></Text>
          <Text style={styles.grandTotal}>Subtotal</Text>
          <Text style={styles.grandTotal}>
            {proformaInvoice.table_data.total}
          </Text>
        </View>
        {!proformaInvoice.test_free && (
          <View style={styles.tableSummary}>
            <Text style={styles.pn}></Text>
            <Text style={styles.description}></Text>
            <Text style={styles.mfg}></Text>
            <Text style={styles.dc}></Text>
            <Text style={styles.qty}></Text>
            <Text style={styles.grandTotal}>Test LAB Fee (USD)</Text>
            <Text style={styles.grandTotal}>{proformaInvoice.test_fee}</Text>
          </View>
        )}
        <View style={styles.tableSummary}>
          <Text style={styles.pn}></Text>
          <Text style={styles.description}></Text>
          <Text style={styles.mfg}></Text>
          <Text style={styles.dc}></Text>
          <Text style={styles.qty}></Text>
          <Text style={styles.grandTotal}>TOTAL (USD)</Text>
          <Text style={styles.grandTotal}>{proformaInvoice.grand_total}</Text>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.noteTitle}>Terms & Conditions</Text>
        <Text style={styles.noteItem}>
          1. Below Terms and Conditions of Sale applies to all orders supplied
          by Exepart.
        </Text>
        <Text style={styles.noteItem}>2. Payment Methods: T/T in advance.</Text>
        <Text style={styles.noteItem}>
          3. Covered by a 90 days warranty from shipment date unless specified
          otherwise.
        </Text>
        <Text style={styles.noteItem}>
          4. We can only accept return with provision of an authorized formal
          test report for any quality issue.
        </Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.noteTitle}>BANK ACCOUNT INFORMATION:</Text>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>Bank Name</Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.name}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>Bank Address</Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.address}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            Account Holder's Name
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.holder}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            Account Holder's Address
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.address_holder}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>Account No</Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.account_no}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            ABA Routing No
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.routing_no}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            BIC/SWIFT Code
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info.swift_code}
          </Text>
        </View>
      </View>

      <Text style={styles.pageNumber} fixed>
        Copyright {new Date().getFullYear()} EXEpart Electronics Inc.
      </Text>
    </Page>
  </Document>
)

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
})

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  imageLogo: {
    width: 200,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Oswald',
    marginBottom: 10,
  },

  inlineItem: {
    flexDirection: 'row',
  },
  sectionSubTitle: {
    width: '30%',
    fontSize: 9,
    fontFamily: 'Oswald',
  },
  subTitleBuyer: {
    width: '30%',
    fontSize: 9,
    fontFamily: 'Oswald',
  },
  subItem: {
    fontSize: 9,
    fontFamily: 'Open Sans',
    width: '30%',
  },
  sectionItemDetail: {
    flexDirection: 'row',
    marginBottom: 9,
    justifyContent: 'space-between',
  },
  leftColumn: {
    flexDirection: 'column',
  },
  rightColumn: {
    flexDirection: 'column',
  },

  tableHead: {
    flexDirection: 'row',
    fontSize: 8,
    fontFamily: 'Oswald',
    backgroundColor: '#b1b1b1',
    padding: 2,
    marginBottom: 1,
  },
  tableBody: {
    flexDirection: 'row',
    fontSize: 8,
    fontFamily: 'Open Sans',
    backgroundColor: '#ececec',
    padding: 2,
    marginBottom: 1,
  },
  tableSummary: {
    flexDirection: 'row',
    fontSize: 8,
    backgroundColor: '#00C8FA',
    padding: 2,
    marginBottom: 1,
  },
  pn: {
    width: '20%',
    fontSize: 7,
    padding: 2,
  },
  description: {
    width: '30%',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  mfg: {
    width: '20%',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  dc: {
    width: '10%',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  qty: {
    width: '10%',
    textAlign: 'right',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  unitPrice: {
    width: '10%',
    textAlign: 'right',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  total: {
    width: '10%',
    textAlign: 'right',
    fontSize: 7,
    padding: 2,
    flexDirection: 'column',
  },
  grandTotal: {
    fontFamily: 'Oswald',
    width: '20%',
    textAlign: 'right',
    fontSize: 10,
    padding: 2,
    flexDirection: 'column',
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Oswald',
  },
  noteItem: {
    fontSize: 8,
    fontFamily: 'Open Sans',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Oswald',
  },
})
export default ProformaInvoice
