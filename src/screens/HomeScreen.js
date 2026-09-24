/**
 * src/screens/HomeScreen.js
 * ---------------------------------------------------------------------------
 * Tela principal do usuário autenticado.
 *
 * O objeto usuario é o User do Firebase:
 * uid, displayName, email, photoURL, emailVerified.
 *
 * O uid é o identificador utilizado para os dados do usuário no Firestore.
 * ---------------------------------------------------------------------------
 */

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { sair } from "../services/autenticacao";
import { useState } from "react";

const logo = require("../../assets/logo.png");
const imagemRodape = require("../../assets/rodape.png");

const { width } = Dimensions.get("window");

const GREEN = "#3FA64A";
const DARK_GREEN = "#218C3A";

// ---------------------------------------------------------------------------
// Dados de exemplo
// ---------------------------------------------------------------------------

const reclamacoes = [
  {
    data: "15/06/2026",
    texto: "Falta de limpeza nas salas de aula e banheiros.",
  },
  {
    data: "13/06/2026",
    texto: "Merenda escolar de baixa qualidade.",
  },
  {
    data: "10/06/2026",
    texto: "Pouca manutenção de equipamentos e instalações.",
  },
];

// ---------------------------------------------------------------------------
// Marca d'água
// ---------------------------------------------------------------------------

function Watermark() {
  const rows = Array.from({ length: 8 });

  return (
    <View style={styles.watermarkContainer} pointerEvents="none">
      {rows.map((_, row) => (
        <View
          key={row}
          style={[
            styles.watermarkRow,
            {
              transform: [
                {
                  translateX: row % 2 === 0 ? -20 : 10,
                },
              ],
            },
          ]}>
          <Text style={styles.watermark}>iFALA</Text>
          <Text style={styles.watermark}>iFALA</Text>
          <Text style={styles.watermark}>iFALA</Text>
        </View>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Cartão de reclamação
// ---------------------------------------------------------------------------

function ComplaintCard({ data, texto }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.userIcon}>
          <Ionicons name="person" size={12} color="#FFFFFF" />
        </View>

        <Text style={styles.youText}>Você</Text>

        <Text style={styles.date}>{data}</Text>
      </View>

      <Text style={styles.complaintText}>{texto}</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Logo IFTM
// ---------------------------------------------------------------------------

function IFTMLogo() {
  return <Image source={imagemRodape} style={styles.logoImage} resizeMode="contain" />;
}

// ---------------------------------------------------------------------------
// HomeScreen
// ---------------------------------------------------------------------------

const HomeScreen = ({ usuario }) => {
  const [saindo, setSaindo] = useState(false);

  const [reclamacao, setReclamacao] = useState("");

  // -------------------------------------------------------------------------
  // Logout
  // -------------------------------------------------------------------------

  const aoSair = async () => {
    if (saindo) {
      return;
    }

    setSaindo(true);

    try {
      await sair();
    } catch (e) {
      console.log("Falha ao sair:", e);

      setSaindo(false);
    }

    /*
     * Não chamamos setSaindo(false) em caso de sucesso.
     *
     * O observador de autenticação deverá desmontar esta tela
     * quando o usuário deixar de estar autenticado.
     */
  };

  // -------------------------------------------------------------------------
  // Enviar reclamação
  // -------------------------------------------------------------------------

  const enviarReclamacao = () => {
    if (!reclamacao.trim()) {
      return;
    }

    console.log("Usuário:", usuario?.uid);
    console.log("Reclamação:", reclamacao);

    setReclamacao("");
  };

  // -------------------------------------------------------------------------
  // Perfil
  // -------------------------------------------------------------------------

  const nomeUsuario = usuario?.displayName ?? "usuário";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* ================================================================
          HEADER
      ================================================================= */}

      <View style={styles.header}>
        {/* Logo */}

        <View style={styles.headerLogo}>
          <Image source={logo} style={styles.headerLogoImage} resizeMode="contain" />
        </View>

        {/* ============================================================
            BOTÕES DO HEADER
        ============================================================= */}

        <View style={styles.headerActions}>
          {/* Home */}

          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Ionicons name="home" size={24} color={DARK_GREEN} />
          </TouchableOpacity>

          {/* Notificações */}

          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Ionicons name="notifications" size={19} color={GREEN} />
          </TouchableOpacity>

          {/* Pesquisa */}

          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Ionicons name="search" size={22} color={GREEN} />
          </TouchableOpacity>

          {/* ==========================================================
              PERFIL / SAIR

              O botão mantém exatamente o mesmo espaço visual do
              ícone original.

              Se o Firebase fornecer photoURL, usamos a foto.
              Caso contrário, mostramos o ícone de usuário.
          =========================================================== */}

          <TouchableOpacity
            style={[styles.headerButton, saindo && styles.headerButtonDisabled]}
            onPress={aoSair}
            disabled={saindo}
            activeOpacity={0.7}>
            {usuario?.photoURL ? (
              <Image
                source={{
                  uri: usuario.photoURL,
                }}
                style={styles.profileImage}
              />
            ) : (
              <Ionicons name="person" size={21} color={GREEN} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ================================================================
          CONTEÚDO
      ================================================================= */}

      <View style={styles.content}>
        <Watermark />

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* ==========================================================
              CAMPO DE RECLAMAÇÃO
          =========================================================== */}

          <View style={styles.inputArea}>
            <TextInput
              value={reclamacao}
              onChangeText={setReclamacao}
              placeholder="Deixe sua reclamação aqui"
              placeholderTextColor="#888"
              style={styles.input}
              multiline={false}
            />

            <TouchableOpacity style={styles.sendButton} onPress={enviarReclamacao} activeOpacity={0.8}>
              <Text style={styles.sendText}>Enviar</Text>
            </TouchableOpacity>
          </View>

          {/* ==========================================================
              HISTÓRICO
          =========================================================== */}

          <View style={styles.history}>
            <Text style={styles.historyTitle}>Histórico</Text>

            <Text style={styles.historySubtitle}>Últimas conversas</Text>

            {reclamacoes.map((item, index) => (
              <ComplaintCard key={index} data={item.data} texto={item.texto} />
            ))}
          </View>

          {/* ==========================================================
              BOTÃO PRÓXIMO
          =========================================================== */}

          <TouchableOpacity style={styles.nextButton} activeOpacity={0.8}>
            <Ionicons name="chevron-forward" size={29} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* ================================================================
          FOOTER
      ================================================================= */}

      <View style={styles.footer}>
        <IFTMLogo />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// ===========================================================================
// ESTILOS
// ===========================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  // -------------------------------------------------------------------------
  // HEADER
  // -------------------------------------------------------------------------

  header: {
    height: 70,
    backgroundColor: GREEN,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "stretch",
    paddingLeft: 20,
    paddingRight: 12,
    justifyContent: "space-between",
  },

  headerLogo: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },

  headerLogoImage: {
    width: 58,
    height: 54,
  },
  headerActions: {
    paddingBottom: 6,
    paddingRight: 16,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 8,
  },

  headerButton: {
    width: 27,
    height: 27,

    borderRadius: 15,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  headerButtonDisabled: {
    opacity: 0.5,
  },

  profileImage: {
    width: 27,
    height: 27,
    borderRadius: 14,
  },

  // -------------------------------------------------------------------------
  // CONTENT
  // -------------------------------------------------------------------------

  content: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 72,
    paddingBottom: 30,

    minHeight: 520,
  },

  // -------------------------------------------------------------------------
  // WATERMARK
  // -------------------------------------------------------------------------

  watermarkContainer: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    overflow: "hidden",

    opacity: 0.1,
  },

  watermarkRow: {
    flexDirection: "row",

    marginTop: 20,
    marginLeft: -25,
  },

  watermark: {
    fontSize: 29,

    fontWeight: "900",

    color: "#9B9B9B",

    marginRight: 12,

    transform: [
      {
        rotate: "-15deg",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // INPUT
  // -------------------------------------------------------------------------

  inputArea: {
    alignItems: "center",
    zIndex: 2,
  },

  input: {
    width: width * 0.66,
    height: 39,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#777",

    borderRadius: 22,

    paddingHorizontal: 14,

    fontSize: 14,
    color: "#333",

    elevation: 5,

    shadowColor: "#000",

    shadowOffset: {
      width: 1,
      height: 3,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  sendButton: {
    alignSelf: "flex-end",

    marginRight: width * 0.13,
    marginTop: 10,

    height: 30,
    minWidth: 83,

    paddingHorizontal: 18,

    borderRadius: 18,

    backgroundColor: GREEN,

    alignItems: "center",
    justifyContent: "center",

    elevation: 3,
  },

  sendText: {
    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "700",
  },

  // -------------------------------------------------------------------------
  // HISTÓRICO
  // -------------------------------------------------------------------------

  history: {
    marginTop: 16,

    paddingHorizontal: 63,

    zIndex: 2,
  },

  historyTitle: {
    color: "#F04444",

    fontSize: 16,
    fontWeight: "800",

    marginBottom: 8,
  },

  historySubtitle: {
    color: "#555",

    fontSize: 11,

    marginBottom: 8,
  },

  // -------------------------------------------------------------------------
  // CARD
  // -------------------------------------------------------------------------

  card: {
    width: "100%",

    minHeight: 63,

    backgroundColor: "#FFFFFF",

    borderRadius: 9,

    marginBottom: 18,

    paddingTop: 8,
    paddingHorizontal: 7,
    paddingBottom: 9,

    borderWidth: 1,
    borderColor: "#888",

    elevation: 4,

    shadowColor: "#000",

    shadowOffset: {
      width: 1,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  cardHeader: {
    height: 18,

    flexDirection: "row",

    alignItems: "center",
  },

  userIcon: {
    width: 14,
    height: 14,

    borderRadius: 7,

    backgroundColor: "#FF4B4B",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 5,
  },

  youText: {
    fontSize: 10,

    color: "#555",

    fontWeight: "500",
  },

  date: {
    marginLeft: "auto",

    fontSize: 7,

    color: "#888",
  },

  complaintText: {
    marginTop: 4,

    fontSize: 9,

    color: "#999",

    lineHeight: 14,
  },

  // -------------------------------------------------------------------------
  // BOTÃO PRÓXIMO
  // -------------------------------------------------------------------------

  nextButton: {
    position: "absolute",

    right: 14,
    bottom: 28,

    width: 27,
    height: 27,

    borderRadius: 15,

    backgroundColor: "#000",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 5,

    elevation: 5,
  },

  // -------------------------------------------------------------------------
  // FOOTER
  // -------------------------------------------------------------------------

  footer: {
    height: 70,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingLeft: 32,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  logoContainer: {
    flexDirection: "row",

    alignItems: "center",
  },

  logoImage: {
    width: 150,
    height: 44,
  },

  logoSquares: {
    width: 31,
    height: 39,

    marginRight: 8,
  },

  logoRow: {
    flexDirection: "row",

    height: 9,
  },

  square: {
    width: 8,
    height: 8,

    marginRight: 2,
    marginBottom: 2,
  },

  greenSquare: {
    backgroundColor: "#18A84A",
  },

  darkSquare: {
    backgroundColor: "#007F3B",
  },

  lightSquare: {
    backgroundColor: "#63BE70",
  },

  logoText: {
    justifyContent: "center",
  },

  logoTitle: {
    fontSize: 9,

    fontWeight: "800",

    color: "#333",
  },

  logoSubtitle: {
    fontSize: 7,

    fontWeight: "700",

    color: "#444",

    marginTop: 1,
  },

  logoCampus: {
    fontSize: 8,

    color: "#555",

    marginTop: 2,
  },
});
