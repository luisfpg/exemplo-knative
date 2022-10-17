Exemplo de FaaS com o Knative
=============================

Exemplo utilizando o Kubernetes com Knative, com uma função FaaS.

# Requisitos

- [NodeJS 16+](https://nodejs.org/)
- [NPM 7+](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [KinD (Kubernetes in Docker)](https://kind.sigs.k8s.io/)
- [Knative cli (kn)](https://knative.dev/docs/client/install-kn/)
- [Knative quickstart plugin (kn-quickstart)](https://knative.dev/docs/install/quickstart-install/)

# Inicialização do ambiente Knative

Para inicializar o Knative para o desenvolvimento local, é recomendado o plugin `quickstart`. Uma vez que todas as dependências tenham sido instaladas, rode o seguinte comando em um terminal: `kn quickstart kind`. Após alguns minutos, o cluster local estará configurado, e o Knative, pronto para a operação.

# Criação da imagem Docker e instalação da função

Abra um terminal no diretório deste exemplo. Então digite:

```bash
npm install
docker build -t kind.local/ola-mundo .
kn service create -f ola-mundo.yaml
```

É utilizado a *tag* da imagem Docker prefixada por `kind.local/` porque o Kubernetes in Docker está configurado para não tentar baixar a imagem Docker de um repositório remoto caso este seja o prefixo.

Você deve ver uma saída semelhante a:

```
Creating service 'ola-mundo' in namespace 'default':

  0.016s The Route is still working to reflect the latest desired specification.
  0.022s ...
  0.051s Configuration "ola-mundo" is waiting for a Revision to become ready.
  2.551s ...
  2.569s Ingress has not yet been reconciled.
  2.603s Waiting for load balancer to be ready
  2.848s Ready to serve.

Service 'ola-mundo' created to latest revision 'ola-mundo-00001' is available at URL:
http://ola-mundo.default.127.0.0.1.sslip.io
```

Após, basta abrir a URL indicada em um navegador, e você verá a saída JSON:

```{"mensagem":"Olá Mundo!"}```

Caso você adicione o parâmetro de nome na URL, como `http://ola-mundo.default.127.0.0.1.sslip.io?nome=Terráqueo`, a saída será:

```{"mensagem":"Olá Terráqueo!"}```

Este é apenas um exemplo escrito em NodeJS que mostra como configurar uma função em um container, e fazer o *deploy* da mesma em um ambiente Knative.