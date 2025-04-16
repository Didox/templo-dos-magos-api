export interface PedidoProdutoDTO {
  produto_id: number
  quantidade: number
  preco_unitario: number
}

export interface PedidoDTO {
  usuario_id: number
  produtos: PedidoProdutoDTO[]
  forma_pagamento: string
  observacoes?: string
}

export interface UpdatePedidoDTO {
  status: 'pendente' | 'aprovado' | 'cancelado' | 'entregue'
}
