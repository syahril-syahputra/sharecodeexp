import { Font, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
export default ({title}) => {
    <View>
        <Image
            style={styles.imageLogo}
            src="/img/exepart-gradient.png"
        />
        <Text style={styles.title}>{title}</Text>
    </View>
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    imageLogo: {
        width: 200,
    },    
    title: {
        fontSize: 20,
        fontFamily: 'Oswald',
        marginBottom: 10
    },

});