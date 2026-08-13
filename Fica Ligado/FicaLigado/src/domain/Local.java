package domain;
public class Local {
    private Integer id;
    private String nome;
    private String rua;
    private Integer numero;
    private String bairro;
    private String cidade;
    private String cep;
    private Integer capacidade;
    private String referencia;

    public Local(Integer id, String nome, String rua, Integer numero, String bairro, String cidade, String cep,
            Integer capacidade, String referencia) {
        this.id = id;
        this.nome = nome;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.capacidade = capacidade;
        this.referencia = referencia;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public Integer getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(Integer capacidade) {
        this.capacidade = capacidade;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    @Override
    public String toString() {
        return "Local [id=" + id + ", nome=" + nome + ", rua=" + rua + ", numero=" + numero + ", bairro=" + bairro
                + ", cidade=" + cidade + ", cep=" + cep + ", capacidade=" + capacidade + ", referencia=" + referencia
                + "]";
    }
    
}
