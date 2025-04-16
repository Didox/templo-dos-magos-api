import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Produto from '#models/produto'
import Categoria from '#models/categoria'

export default class extends BaseSeeder {
  async run() {
    const produtosExistentes = await Produto.query().count('* as total')
    if (produtosExistentes[0].$attributes.total > 0) {
      return
    }

    // Busca todas as categorias disponíveis
    const categorias = await Categoria.all()
    const categoriaIds = categorias.map((categoria) => categoria.id)

    const produtos = [
      {
        id: 1,
        nome: 'Varinha Mágica Premium',
        preco: 299.99,
        descricao: 'Varinha mágica feita de madeira de carvalho com núcleo de pena de fênix.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/clb-commander-legends--battle-for-baldurs-gate/pt/med/magos-de-thay-105.png?5669',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 2,
        nome: 'Livro de Feitiços Antigos',
        preco: 89.9,
        descricao: 'Compêndio de feitiços raros e poderosos de eras passadas.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/lcc-the-lost-caverns-of-ixalan-commander/PT/med/templo-do-misterio-357.png?8123',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 3,
        nome: 'Cristal de Poder',
        preco: 150,
        descricao: 'Cristal natural que amplifica poderes mágicos.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/dprp-duelist-pack-rivals-of-the-pharaoh/en/med/temple-of-the-kings-en037.png?2123?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 4,
        nome: 'Túnica do Arcanista',
        preco: 199.99,
        descricao: 'Túnica elegante com proteções mágicas incorporadas.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/arb-alara-reborn/pt/med/assassino-de-mago-57.png?5385?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 5,
        nome: 'Poção de Invisibilidade',
        preco: 75.5,
        descricao: 'Poção rara que concede invisibilidade temporária.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/dmc-dominaria-united-commander/pt/med/templo-do-triunfo-238.png?2429?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 6,
        nome: 'Amuleto de Proteção',
        preco: 120,
        descricao: 'Amuleto que oferece proteção contra magias malignas.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/w16-welcome-deck-2016/pt/med/esfinge-de-magosi-6.png?2554?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 7,
        nome: 'Grimório do Mestre',
        preco: 250,
        descricao: 'Livro de magia avançada com encadernação especial.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/onc-phyrexia-all-will-be-one-commander/pt/med/templo-da-enfermidade-169.png?3323?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 8,
        nome: 'Bola de Cristal',
        preco: 180,
        descricao: 'Esfera de cristal para previsões e visões do futuro.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/rvr-ravnica-remastered/PT/med/copia-de-encantamento-312.png?4898?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 9,
        nome: 'Anel do Elementalista',
        preco: 160,
        descricao: 'Anel que permite controlar os elementos naturais.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/lcc-the-lost-caverns-of-ixalan-commander/PT/med/templo-do-silencio-358.png?8709?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 10,
        nome: 'Cajado do Sábio',
        preco: 220,
        descricao: 'Cajado antigo com poderes de cura e proteção.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/onc-phyrexia-all-will-be-one-commander/pt/med/templo-da-enfermidade-169.png?3323',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 11,
        nome: 'Kit de Alquimia',
        preco: 95,
        descricao: 'Conjunto completo para preparação de poções mágicas.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/mkm-murders-at-karlov-manor/PT/med/sala-de-visitas-elegante-260.png?6383?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 12,
        nome: 'Pergaminho de Teleporte',
        preco: 45,
        descricao: 'Pergaminho com feitiço de teleporte de emergência.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/mkm-murders-at-karlov-manor/PT/med/linha-de-forca-do-pacto-das-guildas-217.png?8690?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 13,
        nome: 'Elixir da Juventude',
        preco: 500,
        descricao: 'Poção rara que retarda o envelhecimento.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/lci-the-lost-caverns-of-ixalan/PT/back/ojer-axonil-forca-profunda-templo-do-poder-158.png?840',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 14,
        nome: 'Talismã de Sorte',
        preco: 85,
        descricao: 'Talismã que aumenta a sorte em situações mágicas.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/clb-commander-legends--battle-for-baldurs-gate/pt/med/magos-de-thay-105.png?5669',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 15,
        nome: 'Vassoura Voadora',
        preco: 350,
        descricao: 'Vassoura mágica para transporte aéreo.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/lcc-the-lost-caverns-of-ixalan-commander/PT/med/templo-do-misterio-357.png?8123',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 16,
        nome: 'Orbe de Energia',
        preco: 130,
        descricao: 'Orbe que armazena e libera energia mágica.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/dprp-duelist-pack-rivals-of-the-pharaoh/en/med/temple-of-the-kings-en037.png?2123?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 17,
        nome: 'Manto do Invisível',
        preco: 280,
        descricao: 'Manto que concede invisibilidade ao usuário.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/arb-alara-reborn/pt/med/assassino-de-mago-57.png?5385?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 18,
        nome: 'Poção de Cura',
        preco: 60,
        descricao: 'Poção que restaura a saúde e vitalidade.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/dmc-dominaria-united-commander/pt/med/templo-do-triunfo-238.png?2429?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 19,
        nome: 'Dagas Mágicas',
        preco: 190,
        descricao: 'Par de adagas encantadas com poderes elementais.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/w16-welcome-deck-2016/pt/med/esfinge-de-magosi-6.png?2554?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
      {
        id: 20,
        nome: 'Relógio do Tempo',
        preco: 450,
        descricao: 'Relógio mágico que permite manipular o tempo localmente.',
        url_imagem:
          'https://cdn.cardsrealm.com/images/cartas/onc-phyrexia-all-will-be-one-commander/pt/med/templo-da-enfermidade-169.png?3323?&width=250',
        categoria_id: categoriaIds[Math.floor(Math.random() * categoriaIds.length)],
      },
    ]

    for (const produto of produtos) {
      await Produto.updateOrCreate({ id: produto.id }, produto)
    }
  }
}
