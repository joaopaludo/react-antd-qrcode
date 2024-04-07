import { AntDesignOutlined } from '@ant-design/icons'
import { Collapse, QRCode, Space, Input } from 'antd'
import { useState } from 'react'

function QRCodeDemonstration() {
  const { Panel } = Collapse
  const [text, setText] = useState('')

  const defaultValue = 'Texto padrão para geração do QR Code'

  const statuses = ['loading', 'expired', 'scanned', 'active']
  const [codeStatus, setCodeStatus] = useState(statuses[3])

  return (
    <>
      <div className="header">
        <h1>QR Code</h1>
        <AntDesignOutlined className="icon" />
      </div>

      <Collapse accordion className="collapse">
        {/*Funcionamento do QR Code*/}
        <Panel header="Funcionamento do QR Code" key="1">
          <div className="flex-vertical">
            <Space direction="vertical" align="center">
              <QRCode value={text || ' '} />

              <Input
                style={{ width: 300 }}
                placeholder="Digite o texto para gerar o QR Code"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Space>
          </div>
        </Panel>

        {/*Ícone*/}
        {/* Não consegui fazer funcionar */}
        <Panel header="QRCode com ícone" key="2">
          <div className="flex-vertical">
            <QRCode
              errorLevel="H"
              value={defaultValue}
              icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </div>
        </Panel>

        {/*Status*/}
        <Panel header="Status do QRCode" key="3">
          <div className="flex-vertical">
            <QRCode
              value={defaultValue}
              status={codeStatus as 'loading' | 'expired' | 'scanned' | 'active' | undefined}
            />

            <div className="buttons">
              <Space>
                {statuses.map((status) => (
                  <button className="btn" key={status} onClick={() => setCodeStatus(status)}>
                    {status}
                  </button>
                ))}
              </Space>
            </div>
          </div>
        </Panel>

        {/*Opções de renderização*/}
        <Panel header="Opções de renderização" key="4">
          <div className="flex-vertical">
            <div className="flex-horizontal">
              <div className="flex-vertical">
                <QRCode type="canvas" value={defaultValue} />
                <h3>Renderização com canvas</h3>
              </div>

              <div className="flex-vertical" style={{ marginLeft: '100px' }}>
                <QRCode type="svg" value={defaultValue} />
                <h3>Renderização com svg</h3>
              </div>
            </div>
          </div>
        </Panel>

        {/*Customização*/}
        <Panel header="Customização de aparência e visualização" key="5">
          <div className="flex-vertical">
            <h2 style={{ marginBottom: '20px' }}>Cores</h2>
            <div className="flex-horizontal">
              <Space>
                <QRCode value={defaultValue} color="#000" bgColor="#fff" />
                <QRCode value={defaultValue} bgColor="#bbbbbb" />
                <QRCode value={defaultValue} color="#0044ff" />
                <QRCode value={defaultValue} color="#800018" bgColor="#81E1DC" />
              </Space>
            </div>

            <h2 style={{ marginTop: '50px', marginBottom: '20px' }}>Tamanhos</h2>
            <div className="flex-horizontal">
              <Space>
                <QRCode value={defaultValue} size={100} />
                <QRCode value={defaultValue} size={150} />
                <QRCode value={defaultValue} size={180} />
                <QRCode value={defaultValue} size={210} />
                <QRCode value={defaultValue} size={300} />
              </Space>
            </div>
          </div>
        </Panel>

        {/*Download*/}
        <Panel header="Download" key="6">
          QR Code download content
        </Panel>

        {/*Error Level*/}
        <Panel header="Error Level" key="7">
          Error level content
        </Panel>

        {/*Pop up*/}
        <Panel header="Uso em pop up" key="8">
          Pop up content
        </Panel>
      </Collapse>
    </>
  )
}

export default QRCodeDemonstration
