Exemplo de FaaS com o Knative
=============================

Exemplo utilizando o Kubernetes com Knative, com uma função FaaS.

# Requisitos

- [NodeJS 18+](https://nodejs.org/)
- [NPM 7+](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Minikube](https://minikube.sigs.k8s.io/)
- [Knative cli (kn)](https://knative.dev/docs/client/install-kn/)
- [Knative quickstart plugin (kn-quickstart)](https://knative.dev/docs/install/quickstart-install/)

# Inicialização do ambiente Knative com Minikube

Para inicializar o Knative para o desenvolvimento local, é recomendado o plugin `quickstart`. Uma vez que todas as dependências tenham sido instaladas, rode o seguinte comando em um terminal: `kn quickstart minikube`. Após alguns minutos, o cluster local estará configurado, e o Knative, pronto para a operação.

No meio do processo, o instalador fará uma pausa e informará que é necessário rodar um serviço de túnel do Minikube em um terminal separado para o ambiente do Knative quickstart. Para isso, conforme as instruções exibidas, abra um novo terminal e digite: `minikube tunnel --profile knative`. Uma vez que o túnel estiver rodando, volte ao terminal original e pressione Enter para continuar a configuração.

Além disso será necessário configurar o Minikube para utilizar o mesmo repositório do Docker utilizado localmente. Para isso, siga as instruções de https://minikube.sigs.k8s.io/docs/handbook/pushing/#1-pushing-directly-to-the-in-cluster-docker-daemon-docker-env. No caso do Linux / Mac, basta digitar: `eval $(minikube docker-env -p knative)`. Ao seguir as instruções do site, não esqueça de utilizar o perfil knative com o `-p knative`. Isso vai configurar o terminal atual. Para qualquer nova sessão deve-se executar novamente o comando.

# Criação da imagem Docker e instalação da função

Abra um terminal no diretório deste exemplo. Então digite:

```bash
npm install
docker build -t dev.local/ola-mundo .
kn service create -f ola-mundo.yaml --force
```

É utilizado a *tag* da imagem Docker prefixada por `dev.local/` porque o Knative está configurado para não tentar baixar a imagem Docker de um repositório remoto caso este seja o prefixo.

Você deve ver uma saída semelhante a:

```
Creating service 'ola-mundo' in namespace 'default':

  0.020s The Route is still working to reflect the latest desired specification.
  0.025s Configuration "ola-mundo" is waiting for a Revision to become ready.
  2.119s ...
  2.135s Ingress has not yet been reconciled.
  2.166s Waiting for load balancer to be ready
  2.349s Ready to serve.

Service 'ola-mundo' created to latest revision 'ola-mundo-00001' is available at URL:
http://ola-mundo.default.10.108.83.176.sslip.io
```

Após, basta abrir a URL indicada em um navegador, e você verá a saída JSON:

```{"mensagem":"Olá Mundo!"}```

Caso você adicione o parâmetro de nome na URL, como `http://ola-mundo.default.10.108.83.176.sslip.io?nome=Terráqueo`, a saída será:

```{"mensagem":"Olá Terráqueo!"}```

Este é apenas um exemplo escrito em NodeJS que mostra como configurar uma função em um container, e fazer o *deploy* da mesma em um ambiente Knative.
