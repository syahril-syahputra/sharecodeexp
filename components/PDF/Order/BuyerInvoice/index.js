import moment from "moment";
import { Page, View, Text, Font, Document, Image, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({buyerInvoice}) => (
    <Document>
        <Page size="A4" style={styles.body}>            
            <View>
                <Image
                    style={styles.imageLogo}
                    src="/img/exepart-gradient.png"
                />
                <Text style={styles.title}>INVOICE</Text>
            </View>
            <View style={styles.sectionItemDetail}>
                <View style={styles.leftColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            From
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subItem}>
                            EXEpart Electronics INC
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Address
                        </Text>
                        <Text style={styles.subItem}>
                            : White Horse Lab
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Contact Name
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Phone Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            E-mail
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Invoice Date 
                        </Text>
                        <Text style={styles.subItem}>
                            : {moment(buyerInvoice.invoice_date).format('dddd, D MMMM YYYY')}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Invoice Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.invoice_number}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Order Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.order_number}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.sectionItemDetail}>
                <View style={styles.leftColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Bill To
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Buyer
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.buyer.name}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Address
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.buyer.address}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Contact Name
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.user_buyer.name}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Phone Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.buyer.phone}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            E-mail
                        </Text>
                        <Text style={styles.subItem}>
                            : {buyerInvoice.user_buyer.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Ship To 
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Company Name
                        </Text>
                        <Text style={styles.subItem}>
                            : White Horse Lab
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Address
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Contact Name
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Phone Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            E-mail
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
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
                    <Text style={styles.pn}>{buyerInvoice.companies_products.ManufacturerNumber}</Text>
                    <Text style={styles.description}>{buyerInvoice.companies_products.Description}</Text>
                    <Text style={styles.mfg}>{buyerInvoice.companies_products.Manufacture}</Text>
                    <Text style={styles.dc}>{buyerInvoice.companies_products.dateCode}</Text>
                    <Text style={styles.qty}>{buyerInvoice.qty}</Text>
                    <Text style={styles.unitPrice}>{buyerInvoice.price_profite}</Text>
                    <Text style={styles.total}>{buyerInvoice.price_profite * buyerInvoice.qty}</Text>
                </View>
                <View style={{ margin: 5 }}></View>
                <View style={styles.tableBody}>
                    <Text style={styles.pn}></Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.mfg}></Text>
                    <Text style={styles.dc}></Text>
                    <Text style={styles.qty}></Text>
                    <Text style={styles.grandTotal}>Subtotal</Text>
                    <Text style={styles.grandTotal}>{buyerInvoice.price_profite * buyerInvoice.qty}</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.pn}></Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.mfg}></Text>
                    <Text style={styles.dc}></Text>
                    <Text style={styles.qty}></Text>
                    <Text style={styles.grandTotal}>TOTAL (USD)</Text>
                    <Text style={styles.grandTotal}>{buyerInvoice.price_profite * buyerInvoice.qty}</Text>
                </View>
            </View>

            <Text style={styles.pageNumber} fixed>Copyright {new Date().getFullYear()} EXEpart Electronics Inc.</Text>

        </Page>
    </Document>
)

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

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
        marginBottom: 10
    },

    inlineItem: {
        flexDirection: 'row'
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
        justifyContent: 'space-between'
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
        marginBottom: 1
    },
    tableBody: {
        flexDirection: 'row',
        fontSize: 8,
        fontFamily: 'Open Sans',     
        backgroundColor: '#ececec',
        padding: 2,
        marginBottom: 1
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
        fontFamily: 'Open Sans'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
        fontFamily: 'Oswald'
      },
});

export default Invoice;