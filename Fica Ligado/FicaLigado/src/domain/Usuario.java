package domain;

public class Usuario {

    private Integer id;
    private String senha;
    private TipoUsuEnum tipoUsuario;
    private Pessoa pessoa;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public TipoUsuEnum getTipoUsuario() {
        return tipoUsuario;
    }
    public void setTipoUsuario(TipoUsuEnum tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
    public Pessoa getPessoa() {
        return pessoa;
    }
    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
    @Override
    public String toString() {
        return "Usuario [id=" + id + ", senha=" + senha + ", tipoUsuario=" + tipoUsuario + ", pessoa=" + pessoa + "]";
    }


}
