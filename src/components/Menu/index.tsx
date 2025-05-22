import { AiOutlineDelete } from 'react-icons/ai'
import * as Styles from './styles'
import CarrinhoFase from '../../types/CarrinhoFase'
import type { ItemCarrinhoUnico } from '../../types/ItemCarrinho'
import { formataPreco } from '../../utils/formatters'

interface Props {
  $aberto: boolean
  itens: ItemCarrinhoUnico[]
  fase: CarrinhoFase
  numeroPedido: string
  removeItem?: (cartItemIdToRemove: string) => void
  onClose: () => void
  continuarEntrega: () => void
  continuarPagamento: () => void
  continuarConfimacao: () => void
  voltarParaOCarrinho: () => void
  voltarParaOEndereco: () => void
  esvaziarCarrinho: () => void
}

const calcularCarrinho = (itens: ItemCarrinhoUnico[]): number => {
  return itens.reduce((soma, item) => soma + item.preco, 0)
}

const Menu = ({
  $aberto,
  onClose,
  itens,
  fase,
  removeItem,
  continuarEntrega,
  continuarPagamento,
  continuarConfimacao,
  voltarParaOCarrinho,
  voltarParaOEndereco,
  esvaziarCarrinho,
  numeroPedido,
}: Props) => {
  const total = calcularCarrinho(itens)

  return (
    <>
      <Styles.Overlay $aberto={$aberto}>
        <Styles.Sidebar $aberto={$aberto}>
          <Styles.MenuFechar onClick={onClose}>&times;</Styles.MenuFechar>

          {fase === CarrinhoFase.CARRINHO && (
            <>
              <Styles.CarrinhoList>
                {itens.length === 0 ? (
                  <p>Seu carrinho está vazio</p>
                ) : (
                  itens.map((item) => (
                    <Styles.CarrinhoItemContainer key={item.cartItemId}>
                      <Styles.CarrinhoItemImg src={item.foto} />
                      <Styles.CarrinhoInfos>
                        <h3>{item.nome}</h3>
                        <span>{formataPreco(item.preco)}</span>
                      </Styles.CarrinhoInfos>
                      {removeItem && (
                        <Styles.RemoveButton onClick={() => removeItem(item.cartItemId)}>
                          <AiOutlineDelete size={20} />
                        </Styles.RemoveButton>
                      )}
                    </Styles.CarrinhoItemContainer>
                  ))
                )}
              </Styles.CarrinhoList>
              {itens.length > 0 && (
                <>
                  <Styles.Total>
                    <p>Valor total</p>
                    <p>{formataPreco(total)}</p>
                  </Styles.Total>
                  <Styles.ButtonContinuarEntrega
                    className="botaoContinuarEntrega"
                    onClick={continuarEntrega}
                  >
                    Continuar com a entrega
                  </Styles.ButtonContinuarEntrega>
                </>
              )}
            </>
          )}

          {fase === CarrinhoFase.ENTREGA && (
            <>
              <Styles.FormContainer>
                <Styles.TituloMenu>Entrega</Styles.TituloMenu>
                <Styles.Form>
                  <ul>
                    <li>
                      <label htmlFor="">Quem irá receber</label>
                      <input type="text" />
                    </li>
                    <li>
                      <label htmlFor="">Endereço</label>
                      <input type="text" />
                    </li>
                    <li>
                      <label htmlFor="">Cidade</label>
                      <input type="text" />
                    </li>
                    <li className="containerCepNumero">
                      <label htmlFor="">CEP</label>
                      <input type="text" />
                    </li>
                    <li className="containerCepNumero">
                      <label htmlFor="">Número</label>
                      <input type="text" />
                    </li>
                    <li>
                      <label htmlFor="">Complemento (opcional)</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <Styles.ButtonContainer>
                    <Styles.ButtonMenu onClick={continuarPagamento}>
                      Continuar para o pagamento
                    </Styles.ButtonMenu>
                    <Styles.ButtonMenu onClick={voltarParaOCarrinho}>
                      Voltar para o carrinho
                    </Styles.ButtonMenu>
                  </Styles.ButtonContainer>
                </Styles.Form>
              </Styles.FormContainer>
            </>
          )}

          {fase === CarrinhoFase.PAGAMENTO && (
            <>
              <Styles.FormContainer>
                <Styles.TituloMenu>
                  Pagamento - Valor a pagar {formataPreco(total)}
                </Styles.TituloMenu>
                <Styles.Form>
                  <ul>
                    <li>
                      <label htmlFor="">Nome no cartão</label>
                      <input type="text" />
                    </li>
                    <li className="containerNumCartao">
                      <label htmlFor="">Número do cartão</label>
                      <input type="number" />
                    </li>
                    <li className="containerCVV">
                      <label htmlFor="">CVV</label>
                      <input type="number" />
                    </li>
                    <li className="containerMesVencimento">
                      <label htmlFor="">Mês de Vencimento</label>
                      <input type="number" />
                    </li>
                    <li className="containerAnoVencimento">
                      <label htmlFor="">Ano de vencimento</label>
                      <input type="number" />
                    </li>
                  </ul>
                  <Styles.ButtonContainer>
                    <Styles.ButtonMenu onClick={continuarConfimacao}>
                      Finalizar pagamento
                    </Styles.ButtonMenu>
                    <Styles.ButtonMenu onClick={voltarParaOEndereco}>
                      Voltar para a edição de Endereço
                    </Styles.ButtonMenu>
                  </Styles.ButtonContainer>
                </Styles.Form>
              </Styles.FormContainer>
            </>
          )}

          {fase === CarrinhoFase.CONFIRMACAO && (
            <>
              <Styles.FormContainer>
                <Styles.TituloMenu>Pedido realizado - {numeroPedido}</Styles.TituloMenu>
                <p>
                  Estamos felizes em informar que seu pedido já está em processo de preparação e, em
                  breve, será entregue no endereço fornecido.
                  <br />
                  <br /> Gostaríamos de ressaltar que nossos entregadores não estão autorizados a
                  realizar cobranças extras.
                  <br />
                  <br /> Lembre-se da importância de higienizar as mãos após o recebimento do
                  pedido, garantindo assim sua segurança e bem-estar durante a refeição.
                  <br />
                  <br /> Esperamos que desfrute de uma deliciosa e agradável experiência
                  gastronômica. Bom apetite!
                </p>
                <Styles.ButtonContainer>
                  <Styles.ButtonMenu onClick={esvaziarCarrinho}>Concluir</Styles.ButtonMenu>
                </Styles.ButtonContainer>
              </Styles.FormContainer>
            </>
          )}
        </Styles.Sidebar>
      </Styles.Overlay>
    </>
  )
}

export default Menu
