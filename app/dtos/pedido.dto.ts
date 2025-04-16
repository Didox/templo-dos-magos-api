export type PedidoProdutoDTO = {
  produto_id: number
  quantidade: number
  preco_unitario: number
}

export type PedidoDTO = {
  usuario_id: number
  produtos: PedidoProdutoDTO[]
  forma_pagamento: string
  observacoes?: string
}

export type UpdatePedidoDTO = {
  status: 'pendente' | 'aprovado' | 'cancelado' | 'entregue'
}