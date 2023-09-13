import moment from "moment";
import { Page, View, Text, Font, Image, Document, StyleSheet } from "@react-pdf/renderer";

const Quotation = ({quotation}) => (
    <Document pageMode="fullScreen">
        <Page size='A4' style={styles.body}>
            <View>
                <Image
                    style={styles.imageLogo}
                    src="/img/exepart-gradient.png"
                />
                <Text style={styles.title}>QUOTATION</Text>
            </View>         
            <View style={styles.quotationItemDetail}>
                <View style={styles.leftColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleNumber}>
                            Quotation Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {quotation.quotation_info.number}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleNumber}>
                            Quotation Date
                        </Text>
                        <Text style={styles.subItem}>
                            : {moment(quotation.quotation_info.date).format('dddd, D MMMM YYYY')}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleNumber}>
                            Quotation Details
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleNumber}>
                            Shipping Term   
                        </Text>
                        <Text style={styles.subItem}>
                            : {quotation.quotation_info.shipping_term}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleNumber}>
                            Payment Term 
                        </Text>
                        <Text style={styles.subItem}>
                            : {quotation.quotation_info.payment_term}
                        </Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.quotationItemDetail}>
                <View style={styles.leftColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleBuyer}>
                            From
                        </Text>
                        <Text style={styles.subItem}>
                            : {quotation.quotation_info.from}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleBuyer}>
                            To
                        </Text>
                        <Text style={styles.subItem}>
                            : {quotation.quotation_info.to_company}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.subTitleBuyer}>
                            Contact Name
                        </Text>
                        <Text style={styles.subItem}>
                            : {quotation.quotation_info.name_user_buyer} ({quotation.quotation_info.email_user_buyer})
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
                    <Text style={styles.pn}>{quotation.table_data.pn}</Text>
                    <Text style={styles.description}>{quotation.table_data.description}</Text>
                    <Text style={styles.mfg}>{quotation.table_data.mfg}</Text>
                    <Text style={styles.dc}>{quotation.table_data.datecode}</Text>
                    <Text style={styles.qty}>{quotation.table_data.qty}</Text>
                    <Text style={styles.unitPrice}>{quotation.table_data.unit_price}</Text>
                    <Text style={styles.total}>{quotation.table_data.total}</Text>
                </View>
                <View style={{ margin: 5 }}></View>
                {!quotation.test_free &&
                    <View style={styles.tableBody}>
                        <Text style={styles.pn}></Text>
                        <Text style={styles.description}></Text>
                        <Text style={styles.mfg}></Text>
                        <Text style={styles.dc}></Text>
                        <Text style={styles.qty}></Text>
                        <Text style={styles.grandTotal}>Test LAB Fee (USD)</Text>
                        <Text style={styles.grandTotal}>{quotation.test_fee}</Text>
                    </View>
                }
                <View style={styles.tableSummary}>
                    <Text style={styles.pn}></Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.mfg}></Text>
                    <Text style={styles.dc}></Text>
                    <Text style={styles.qty}></Text>
                    <Text style={styles.grandTotal}>TOTAL (USD)</Text>
                    <Text style={styles.grandTotal}>{quotation.grand_total}</Text>
                </View>
            </View>

            <View style={{marginTop: 15}}>
                <Text style={styles.noteTitle}>Note</Text>
                <Text style={styles.noteItem}>Please note that the stocks and prices are subject to change every day. Units and prices presented in this offer is valid 1 day.</Text>
                <Text style={styles.noteItem}>Estimated delivery is based upon availability at time of quotation.</Text>
            </View>

            <Text style={styles.pageNumber} fixed>Copyright {new Date().getFullYear()} EXEpart Electronics Inc.</Text>
        </Page>
    </Document>
);
  
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
    subTitleNumber: {
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
        fontFamily: 'Open Sans'
    },
    quotationItemDetail: {
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
    tableSummary: {
        flexDirection: 'row',
        fontSize: 8,   
        backgroundColor: '#00C8FA',
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
export default Quotation;