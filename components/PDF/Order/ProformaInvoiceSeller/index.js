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

const ProformaInvoiceSeller = ({ proformaInvoice }) => (
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
            <Text style={styles.sectionSubTitle}>Ship To</Text>
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
        <Text style={styles.noteTitle}>TERMS AND CONDITIONS OF SALE</Text>
        <Text style={styles.noteItem}>
          Orders: All orders placed by Buyer are subject to acceptance by
          Seller. Orders may not be cancelled or rescheduled without Seller’s
          written consent and are subject to restocking fees. All orders must
          include quantities, part numbers, price and complete description of
          the Products being purchased. Seller may in its sole discretion
          allocate Products to its customers.
        </Text>
        <Text style={styles.noteItem}>
          1. Prices: All quotes (prices) of products are subject to prior sale.
          Pricing for undelivered Products may be increased in the event of an
          increase in Seller’s cost, change in market conditions or any other
          causes beyond the Seller’s reasonable control. Price quotations,
          unless otherwise stated, shall automatically expire thirty (30)
          calendar days from the date issued and may be cancelled or amended
          within that period upon notice to Buyer, Unless otherwise agreed to in
          writing by Seller, all prices quoted are exclusive of transportation
          and insurance costs, duties, and all taxes including Federal, State
          and local sales, excise and value added taxes, and similar taxes.
          Buyer agrees to pay these taxes unless Buyer has provided Seller with
          an exemption resale certificate in the appropriate form for the
          jurisdiction of the Buyer’s place of business and any jurisdiction to
          which the Product is to be directly shipped hereunder, or unless the
          sale is otherwise exempt from these taxes. Buyer agrees to indemnify
          and hold harmless Seller for any liability for tax in connection with
          the sale, as well as the collection or withholding thereof, including
          penalties and interest thereon. Where applicable, transportation and
          taxes shall appear as separate items on Seller’s invoice.{' '}
        </Text>
        <Text style={styles.noteItem}>
          2. Delivery: All shipments are “F.O.B.” place of shipment. Delivery
          will be deemed complete and risk of loss or damage to the Product will
          pass to the Buyer upon delivery to the carrier. Buyer acknowledges
          that delivery dates provided by Seller are estimates only, and Seller
          shall not be liable for any delays in delivery or for failure to
          perform due to causes beyond the reasonable control of Seller, nor
          shall the carrier be deemed the agent of Seller. In the event of delay
          caused by such event, the date of delivery shall be extended for a
          period equal to the time lost as a consequence of the delay in
          delivery, without subjecting Seller to any liability. If the Products
          perish while in the custody of the carrier, the Seller shall be deemed
          to have performed its obligations hereunder in full.
        </Text>
        <Text style={styles.noteItem}>
          3. Acceptance/Returns: Shipments will deem to have been accepted by
          Buyer upon receipt of said shipment at Buyer’s facility. Buyer shall
          perform whatever inspection or tests Buyer deems necessary as promptly
          as possible but in no event later than five (5) days after delivery,
          at which time Buyer must either accept or reject the Products. Any
          discrepancy in shipment quantity must be reported within five (5)
          business days of receipt of the Products. In the event parts are
          return for replacement or credit, they must have a Return Material
          Authorization (RMA) issued. Parts returned without authorization will
          not be accepted for credit. RMA number will only be issued within 30
          days of receipt of product. A restocking fee will be charged on all
          items returned (if not our error )
        </Text>
        <Text style={styles.noteItem}>
          4. Limited Warranty and Limitation of Liability: (a) Seller warrants
          that the Products will conform to the description and specifications
          issued by the manufacturer for a period of 30 days from the date of
          purchase, or such shorter period specified by the manufacturer of the
          Product, and that Seller will transfer to Buyer any transferable
          warranties or indemnities that the manufacturer of the Product or the
          third party vendor/service provider provides to Seller. SELLER SHALL
          HAVE NO LIABILITY TO BUYER BEYOND THE EXPRESS TERMS OF SUCH
          MANUFACTURER PRODCT WARRANTIES. THIS WARRANTY IS MADE IN LIEU OF ANY
          AND ALL OTHER WARRANTES EXPRESS OR IMPLIED INCLUDING THE WARRANTIES OF
          MERCHANTABILITY AND FITNESS. (b) Seller’s exclusive obligations with
          respect to a non-conforming Product shall be at Seller’s option, to
          repair or replace the Product, if it is determined to be defective, or
          to refund to Buyer the purchase price paid for the Product.
          Notwithstanding anything herein to the contrary, the liability of
          seller hereunder for all claims shall not exceed the sum of the
          Buyer’s payments for the Products, which are the subject of the
          dispute, and the foregoing is Buyer’s sole and exclusive remedy for
          breach of warranty by Seller with respect to the Product. THE
          FOREGOING WARRANTIES ARE THE SOLE WARRANTIES EXPRESSED OR IMPLIED,
          GIVEN BY SELLER IN CONNECTION WITH THE PRODUCTS, AND SELLER DISCLAIMS
          ALL OTHER WARRANTIES INCLUDING, BUT NOT LIMITED TO WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT OF
          THIRD PARTY RIGHTS AND WARRANTIES AGAINST LATENT DEFECTS. (c) This
          warranty shall not apply to any Products that have been subject to
          misuse, mishandling, or which have been operated contrary to current
          instructions relating to installation, maintenance, or operation or
          contrary to industry standards relating to acceptable input power. (d)
          Seller shall have no liability for any copyright, design or patent
          infringement, which may occur, as a result of a sale of the Products
          to the Buyer. The only remedy or recourse for copyright, design or
          patent infringement shall be against the manufacturer of the Products.
          (e) IN NO EVENT WILL SELLER (OR ITS SUPPLIERS) BE LIABLE FOR ANY
          SPECIAL, INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES WHATSOEVER
          INCLUDING, WITHOUT LIMITATION, THOSE RESULTING FROM ANTICIPATED OR
          LOST PROFITS, LOST DATA, BUSINESS INTERRUPTION, LOSS OF BUSINESS, LOSS
          OF MARKET SHARE, LOSS OF GOODWILL OR MAUFACTURING EXPENSES AND ANY
          OTHER LOSS OR LOSSES THAT MIGHT ARISE AS A DIRECT OR INDIRECT RESULT
          OF THE SALE OR USE OF THE PRODUCTS OR AS A RESULT OF SELLER’S NON
          PERFORMANCE OR INADEQUATE PERFORMANCE OF ITS OBLIGATIONS, WHETHER
          BASED ON WARRANTY, CONTRACT, TORT OR ANY OTHER LEGAL THEORY AND
          WHETHER OR NOT ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </Text>
        <Text style={styles.noteItem}>
          5. Export Control/Use of Products: Buyer certifies that it will be the
          recipient of the Products to be delivered by Seller. Buyer
          acknowledges that the Products are subject to the export/import
          control laws and regulations of various countries, including the
          Export Administration Laws of the United States. Buyer understands and
          agrees that it will not sell, resell, re-export or ship or otherwise
          divert, directly or indirectly, any of the Products delivered by
          Seller and further agrees to comply strictly with all U.S. export laws
          and assumes sole responsibility for obtaining licenses to export or
          re-export as ma be required.
        </Text>
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={styles.noteTitle}>BANK ACCOUNT INFORMATION:</Text>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>Bank Name</Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.name}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>Bank Address</Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.address}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            Account Holder's Name
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.holder}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            Account Holder's Address
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.address_holder}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>Account No</Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.account_no}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            ABA Routing No
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.routing_no}
          </Text>
        </View>
        <View style={styles.inlineItem}>
          <Text style={[styles.noteItem, { width: '20%' }]}>
            BIC/SWIFT Code
          </Text>
          <Text style={styles.noteItem}>
            : {proformaInvoice.bank_info?.swift_code}
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
    marginTop: 8,
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
export default ProformaInvoiceSeller
