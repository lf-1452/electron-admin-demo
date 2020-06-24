const config = {
    development: {
        walletId: '71394f7acdf511e98928000c2914cfac',
        bClientId: 'bonade',
        url: 'http://192.168.14.214:4000/oauth2-zt/oauth/login',
        ticketurl: 'http://192.168.14.214:4000/oauth2-zt/api_create_ticket_redirect_token',
        imTokenUrl: 'http://192.168.14.214:4000/oauth2-zt/component/api_create_ticket_token',
        // 密钥
        pubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUoHGYCV0xrvQacKnd81bR5jY5ph50bGa8ixpl6siyfdL8GDStVUaatqFrfaExzg0Gi0i399ZG9xSVn5iIsdrUq4HDQHZXqfmC+Ss3GBTPkYickTUpmnPzod9AMyEDnddVD1vyfuePw1JaeEpqhEtyRs6bra8q4LtVQIdYtBmJdwIDAQAB',
    },
    production: {
        bClientId: '847ce78478a211e99c7e7cd30ad3a6a8',
        url: "http://ztrhgzt.bndxqc.com/api/reimbursement/notoken/userLogin",
        ticketurl: "http://ztrhgzt.bndxqc.com/api/oauth2-zt/api_create_ticket_redirect_token",
        imTokenUrl: "https://imzt.bndxqc.com/api/oauth2-zt/component/api_create_ticket_token",
        pubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB',
    },
    test: {
        bClientId: 'a686023f70a711e9b9fd7cd30a5a3208',
        walletId: 'cc4b0923666a11e99c718cec4b6d151c',
        // url: 'http://119.23.17.10:8081/api/oauth2-zt/oauth/login',
        url: 'http://119.23.17.10:8080/api/reimbursement/notoken/userLogin',
        ticketurl: 'http://119.23.17.10:8081/api/oauth2-zt/api_create_ticket_redirect_token',
        imTokenUrl: 'http://119.23.111.61:8081/api/oauth2-zt/component/api_create_ticket_token',
        pubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUoHGYCV0xrvQacKnd81bR5jY5ph50bGa8ixpl6siyfdL8GDStVUaatqFrfaExzg0Gi0i399ZG9xSVn5iIsdrUq4HDQHZXqfmC+Ss3GBTPkYickTUpmnPzod9AMyEDnddVD1vyfuePw1JaeEpqhEtyRs6bra8q4LtVQIdYtBmJdwIDAQAB'
    },
    experience: {
        bClientId: 'a686023f70a711e9b9fd7cd30a5a3208',
        walletId: '59a9f236804d11e9961c7cd30aeb7680',
        url: 'https://ztybxty.bndxqc.com/api/reimbursement/notoken/userLogin',
        ticketurl: 'http://119.23.48.167:8081/api/oauth2-zt/api_create_ticket_redirect_token',
        imTokenUrl: 'http://119.23.48.167:8081/api/oauth2-zt/component/api_create_ticket_token',
        pubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXRyojOxs5Z8KBfnb6s+KcpE2bZdj+TPclUyKFNDV8oeXsoV6aUSuCOTBuNUTL31NgpqLNqJqNZU0q91O46xmbhzNbYanSbRqhdx9C/pgAElkXB3C/SoBHAZ/Lm/SyFaZoJoAOkD5p2IsrLLh7yt07MT3qrTr991B+5Je58CIizQIDAQAB',
    }
}

export default process.env.VUE_APP_TITLE ? config[process.env.VUE_APP_TITLE] : config.production;