import domain.*;

    public class App {
    public static void main(String[] args) throws Exception {
        Area area = new Area(id: 1, nome: "Computação");
        Local local = new Local (id: 1,
                                 nome: "Auditorio IFTM Udi Centro",
                                 rua: "Rua Blanche Galassi",
                                 numero: 1150,
                                 bairro: "Morada da Colina",
                                 cidade: "Uberlândia",
                                 сер: "38400000",
                                 capacidade: 120,
                                 referencia: "Dentro do campus");
        Pessoa pessoa = new Pessoa (id: 1,
                                    nome: "Carlos Eduardo",
                                    linkFoto: "/home/cadu.jpg",
                                    biografia: "Professor",
                                    email: "carloseduardodantas@iftm.edu.br");
        System.out.println(area);
        System.out.println(local);
        System.out.println(pessoa);
    }
}
