import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete } from 'react-icons/ai'
import { useFormik } from 'formik'
import { IMaskInput } from 'react-imask'

import type { RootState } from '../../store'
import { clearOrderData, setDeliveryData, setPaymentData } from '../../store/reducers/order'
import { usePurchaseMutation, type CheckoutPayload } from '../../services/api'
import CarrinhoFase from '../../types/CarrinhoFase'
import type { ItemCarrinhoUnico } from '../../types/ItemCarrinho'
import { formataPreco } from '../../utils/formatters'
import { entregaSchema, pagamentoSchema } from '../../schemas/validationSchemas'

import * as Styles from './styles'

interface Props {
  $aberto: boolean
  itens: ItemCarrinhoUnico[]
  fase: CarrinhoFase
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
}: Props) => {
  const total = calcularCarrinho(itens)

  const dadosEntrega = useSelector((state: RootState) => state.order.deliveryData)
  const dadosPagamento = useSelector((state: RootState) => state.order.paymentData)
  const dispatch = useDispatch()

  const [purchase, { data, isLoading: isSedingOrder }] = usePurchaseMutation()

  const formikEntrega = useFormik({
    initialValues: {
      quemRecebe: dadosEntrega?.receiver || '',
      endereco: dadosEntrega?.address.description || '',
      cidade: dadosEntrega?.address.city || '',
      cep: dadosEntrega?.address.zipCode || '',
      numero: dadosEntrega?.address.number.toString() || '',
      complemento: dadosEntrega?.address.complement || '',
    },
    validationSchema: entregaSchema,
    onSubmit: (values) => {
      const deliveryPayload = {
        receiver: values.quemRecebe,
        address: {
          description: values.endereco,
          zipCode: values.cep.replace(/-/g, ''),
          city: values.cidade,
          number: parseInt(values.numero),
          complement: values.complemento || '',
        },
      }
      dispatch(setDeliveryData(deliveryPayload))
      setTimeout(() => {
        continuarPagamento()
      }, 50)
    },
  })

  const formikPagamento = useFormik({
    initialValues: {
      nomeNoCartao: dadosPagamento?.card.name || '',
      numeroCartao: dadosPagamento?.card.number || '',
      cvv: dadosPagamento?.card.code?.toString() || '',
      mesVencimento: dadosPagamento?.card.expires.month.toString() || '',
      anoVencimento: dadosPagamento?.card.expires.year.toString() || '',
    },
    validationSchema: pagamentoSchema,
    onSubmit: async (values) => {
      const paymentPayload = {
        card: {
          name: values.nomeNoCartao,
          number: values.numeroCartao.replace(/\s/g, ''),
          code: parseInt(values.cvv),
          expires: {
            month: parseInt(values.mesVencimento),
            year: parseInt(values.anoVencimento),
          },
        },
      }
      dispatch(setPaymentData(paymentPayload))
      setTimeout(() => {
        handleConcluirPedido(dadosEntrega, paymentPayload)
      }, 0)
    },
  })

  const handleConcluirPedido = async (
    deliveryData: typeof dadosEntrega,
    paymentData: typeof dadosPagamento,
  ) => {
    if (!deliveryData || !paymentData) {
      console.error(
        'Erro: Dados de entrega ou pagamento ausentes ao tentar concluir o pedido. Verifique se os dispatches foram concluídos.',
      )
      return
    }

    const payload: CheckoutPayload = {
      products: itens.map((item) => ({
        id: item.id,
        price: item.preco,
      })),
      delivery: deliveryData,
      payment: paymentData,
    }

    try {
      const result = await purchase(payload).unwrap()
      console.log('Pedido enviado com sucesso:', result)
      dispatch(clearOrderData())
      esvaziarCarrinho()
      continuarConfimacao()
    } catch (err) {
      console.error('Erro ao enviar o pedido:', err)
      if (err && typeof err === 'object' && 'data' in err) {
        console.error('Detalhes do erro da API:', err.data)
      }
    }
  }

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
                <Styles.Form onSubmit={formikEntrega.handleSubmit}>
                  <ul>
                    <li>
                      <label htmlFor="quemRecebe">Quem irá receber</label>
                      <input
                        type="text"
                        id="quemRecebe"
                        name="quemRecebe"
                        value={formikEntrega.values.quemRecebe}
                        onChange={formikEntrega.handleChange}
                        onBlur={formikEntrega.handleBlur}
                      />
                      {formikEntrega.touched.quemRecebe && formikEntrega.errors.quemRecebe ? (
                        <small>{formikEntrega.errors.quemRecebe}</small>
                      ) : null}
                    </li>
                    <li>
                      <label htmlFor="endereco">Endereço</label>
                      <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={formikEntrega.values.endereco}
                        onChange={formikEntrega.handleChange}
                        onBlur={formikEntrega.handleBlur}
                      />
                      {formikEntrega.touched.endereco && formikEntrega.errors.endereco ? (
                        <small>{formikEntrega.errors.endereco}</small>
                      ) : null}
                    </li>
                    <li>
                      <label htmlFor="cidade">Cidade</label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formikEntrega.values.cidade}
                        onChange={formikEntrega.handleChange}
                        onBlur={formikEntrega.handleBlur}
                      />
                      {formikEntrega.touched.cidade && formikEntrega.errors.cidade ? (
                        <small>{formikEntrega.errors.cidade}</small>
                      ) : null}
                    </li>
                    <li className="containerCepNumero">
                      <label htmlFor="cep">CEP</label>
                      <IMaskInput
                        type="text"
                        id="cep"
                        name="cep"
                        mask="00000-000"
                        value={formikEntrega.values.cep}
                        onAccept={(value) => formikEntrega.setFieldValue('cep', value)}
                        onBlur={formikEntrega.handleBlur}
                      />
                      {formikEntrega.touched.cep && formikEntrega.errors.cep ? (
                        <small>{formikEntrega.errors.cep}</small>
                      ) : null}
                    </li>
                    <li className="containerCepNumero">
                      <label htmlFor="numero">Número</label>
                      <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formikEntrega.values.numero}
                        onChange={formikEntrega.handleChange}
                        onBlur={formikEntrega.handleBlur}
                      />
                      {formikEntrega.touched.numero && formikEntrega.errors.numero ? (
                        <small>{formikEntrega.errors.numero}</small>
                      ) : null}
                    </li>
                    <li>
                      <label htmlFor="complemento">Complemento (opcional)</label>
                      <input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={formikEntrega.values.complemento}
                        onChange={formikEntrega.handleChange}
                        onBlur={formikEntrega.handleBlur}
                      />
                      {formikEntrega.touched.complemento && formikEntrega.errors.complemento ? (
                        <small>{formikEntrega.errors.complemento}</small>
                      ) : null}
                    </li>
                  </ul>
                  <Styles.ButtonContainer>
                    <Styles.ButtonMenu type="submit">Continuar para o pagamento</Styles.ButtonMenu>
                    <Styles.ButtonMenu type="button" onClick={voltarParaOCarrinho}>
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
                <Styles.Form onSubmit={formikPagamento.handleSubmit}>
                  <ul>
                    <li>
                      <label htmlFor="nomeNoCartao">Nome no cartão</label>
                      <input
                        type="text"
                        id="nomeNoCartao"
                        name="nomeNoCartao"
                        value={formikPagamento.values.nomeNoCartao}
                        onChange={formikPagamento.handleChange}
                        onBlur={formikPagamento.handleBlur}
                      />
                      {formikPagamento.touched.nomeNoCartao &&
                      formikPagamento.errors.nomeNoCartao ? (
                        <small>{formikPagamento.errors.nomeNoCartao}</small>
                      ) : null}
                    </li>
                    <li className="containerNumCartao">
                      <label htmlFor="numeroCartao">Número do cartão</label>
                      <IMaskInput
                        type="text"
                        id="numeroCartao"
                        name="numeroCartao"
                        mask="0000 0000 0000 0000"
                        value={formikPagamento.values.numeroCartao}
                        onAccept={(value) => formikPagamento.setFieldValue('numeroCartao', value)}
                        onBlur={formikPagamento.handleBlur}
                      />
                      {formikPagamento.touched.numeroCartao &&
                      formikPagamento.errors.numeroCartao ? (
                        <small>{formikPagamento.errors.numeroCartao}</small>
                      ) : null}
                    </li>
                    <li className="containerCVV">
                      <label htmlFor="cvv">CVV</label>
                      <IMaskInput
                        type="number"
                        id="cvv"
                        name="cvv"
                        mask="000"
                        value={formikPagamento.values.cvv}
                        onAccept={(value) => formikPagamento.setFieldValue('cvv', value)}
                        onBlur={formikPagamento.handleBlur}
                      />
                      {formikPagamento.touched.cvv && formikPagamento.errors.cvv ? (
                        <small>{formikPagamento.errors.cvv}</small>
                      ) : null}
                    </li>
                    <li className="containerMesVencimento">
                      <label htmlFor="mesVencimento">Mês de Vencimento</label>
                      <IMaskInput
                        type="number"
                        id="mesVencimento"
                        name="mesVencimento"
                        mask="00"
                        value={formikPagamento.values.mesVencimento}
                        onAccept={(value) => formikPagamento.setFieldValue('mesVencimento', value)}
                        onBlur={formikPagamento.handleBlur}
                      />
                      {formikPagamento.touched.mesVencimento &&
                      formikPagamento.errors.mesVencimento ? (
                        <small>{formikPagamento.errors.mesVencimento}</small>
                      ) : null}
                    </li>
                    <li className="containerAnoVencimento">
                      <label htmlFor="anoVencimento">Ano de vencimento</label>
                      <IMaskInput
                        type="number"
                        id="anoVencimento"
                        name="anoVencimento"
                        mask="0000"
                        value={formikPagamento.values.anoVencimento}
                        onAccept={(value) => formikPagamento.setFieldValue('anoVencimento', value)}
                        onBlur={formikPagamento.handleBlur}
                      />
                      {formikPagamento.touched.anoVencimento &&
                      formikPagamento.errors.anoVencimento ? (
                        <small>{formikPagamento.errors.anoVencimento}</small>
                      ) : null}
                    </li>
                  </ul>
                  <Styles.ButtonContainer>
                    <Styles.ButtonMenu type="submit" disabled={isSedingOrder}>
                      {isSedingOrder ? 'Enviando Pedido...' : 'Finalizar Pedido'}
                    </Styles.ButtonMenu>
                    <Styles.ButtonMenu type="button" onClick={voltarParaOEndereco}>
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
                <Styles.TituloMenu>Pedido realizado - {data?.orderId}</Styles.TituloMenu>
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
                  <Styles.ButtonMenu onClick={onClose}>Concluir</Styles.ButtonMenu>
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
