import { Page, Text, View, Document, StyleSheet, Image, Svg } from '@react-pdf/renderer';
import MyStocklogo from '../../../../assets/icons/logoMyStock-v1.png'

const s = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: "40px",
      paddingHorizontal: "20px"
    },
    logoSection: {
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        display: "flex",
        justifyContent: "start",
        alignContent: "start",
    },
    titleSection: {
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignContent: "start",
        textAlign: "left",
        color: "#252525",
    },
    mainLogo: {
        width: "200px",
    },
  });


  const downloadFileFromResponseObjectPdf = (
    responseObject = {},
    fileName = ""
  ) => {
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(
      new Blob([responseObject.data], { type: "application/pdf" })
    );
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };
  
  
  const openUrlInNewTab = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

function RelatorioGeral(){
    return(
        <Document>
        <Page size="A4" style={s.page}>
            <View style={s.logoSection}>
                <Image src={MyStocklogo} style={s.mainLogo}/>
                <Text>Relatório Geral</Text>
            </View>
            <View style={s.titleSection}>
                <Text>Resumo</Text>
            </View>
            <View style={s.titleSection}>
                <Text>Vendas</Text>
            </View>
            <View style={s.titleSection}>
                <Text>Funcionários</Text>
            </View>
            <View style={s.titleSection}>
                <Text>Produtos Próximos a Zerar</Text>
            </View>
            <View style={s.titleSection}>
                <Text>Estoque</Text>
            </View>
        </Page>
      </Document>
    )
}

export default RelatorioGeral;