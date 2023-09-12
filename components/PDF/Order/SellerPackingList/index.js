import moment from "moment";
import { Page, View, Text, Font, Document, Image, StyleSheet } from "@react-pdf/renderer";

const PackingList = ({sellerPackingList}) => (
    <Document>
        <Page size="A4" style={styles.body}>            
            <View>
                <Image
                    style={styles.imageLogo}
                    src="/img/exepart-gradient.png"
                />
                <Text style={styles.title}>PACKING LIST</Text>
            </View>
            <View style={styles.sectionItemDetail}>
                <View style={[styles.sectionColumn, {width: '60%'}]}>
                </View>
                <View style={styles.sectionColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            SALES ORDER
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            ORDER DATE
                        </Text>
                        <Text style={styles.subItem}>
                            : {moment(sellerPackingList.order_date).format('dddd, D MMMM YYYY')}
                        </Text>
                    </View>
                    <View style={[styles.inlineItem, {marginTop: '10'}]}>
                        <Text style={styles.sectionSubTitle}>
                            CARRIER
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.order_number}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            PACKAGE TYPE
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.companies_products.packaging}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            TRACKING
                        </Text>
                        <Text style={styles.subItem}>
                            : {'---'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.sectionItemDetail}>
                <View style={styles.sectionColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            SHIP FROM
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Company Name
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.companies_products.company.name}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Address
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.companies_products.company.address}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            City/Country
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.companies_products.company.city} / {sellerPackingList.companies_products.company.country}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            Phone Number
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.companies_products.company.phone}
                        </Text>
                    </View>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            E-mail
                        </Text>
                        <Text style={styles.subItem}>
                            : {sellerPackingList.companies_products.company.master_user.email}
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionColumn}>
                    <View style={styles.inlineItem}>
                        <Text style={styles.sectionSubTitle}>
                            SHIP TO
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
                            City/Country
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
                    <Text style={styles.item}>Item</Text>
                    <Text style={styles.description}>Description</Text>
                    <Text style={styles.qty}>Quantity</Text>
                    <Text style={styles.weight}>Weight (Net)</Text>
                    <Text style={styles.size}>CTN Size (L/W/H)</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.item}>Item</Text>
                    <Text style={styles.description}>Description</Text>
                    <Text style={styles.qty}>Quantity</Text>
                    <Text style={styles.weight}>Weight (Net)</Text>
                    <Text style={styles.size}>CTN Size (L/W/H)</Text>
                </View>
                <View style={{ margin: 5 }}></View>
                <View style={styles.tableBody}>
                    <Text style={styles.item}></Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.qty}></Text>
                    <Text style={styles.grossWeight}>Gross Weight</Text>
                    <Text style={styles.grossWeight}>---Kg</Text>
                </View>
                <View style={styles.tableBody}>
                    <Text style={styles.item}></Text>
                    <Text style={styles.description}></Text>
                    <Text style={styles.qty}></Text>
                    <Text style={styles.totalWeight}>Total Weight</Text>
                    <Text style={styles.totalWeight}>---Kg</Text>
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
    sectionColumn: {
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
    item: {
        width: '30%',
        fontSize: 7,
        padding: 2,
    },
    description: {
        width: '40%',
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
    weight: {
        width: '10%',
        textAlign: 'right',
        fontSize: 7,
        padding: 2,
        flexDirection: 'column',
    },
    size: {
        width: '10%',
        textAlign: 'right',
        fontSize: 7,
        padding: 2,
        flexDirection: 'column',
    },
    grossWeight: {
        fontFamily: 'Oswald',
        width: '20%',
        textAlign: 'right',
        fontSize: 10,
        padding: 2,
        flexDirection: 'column',
    },
    totalWeight: {
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

export default PackingList;