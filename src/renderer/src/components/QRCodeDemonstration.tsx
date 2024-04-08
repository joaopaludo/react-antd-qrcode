import { AntDesignOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Collapse, QRCode, Space, Input, Button, Segmented, type QRCodeProps, Popover } from 'antd'
import { useState } from 'react'

function QRCodeDemonstration() {
  const { Panel } = Collapse
  const [text, setText] = useState('')

  const defaultValue = 'Texto padrão para geração do QR Code'

  const statuses = ['loading', 'expired', 'scanned', 'active']
  const [codeStatus, setCodeStatus] = useState(statuses[3])

  const [size, setSize] = useState<number>(160)

  const aumentar = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10
      if (newSize >= 300) {
        return 300
      }
      return newSize
    })
  }

  const diminuir = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10
      if (newSize <= 48) {
        return 48
      }
      return newSize
    })
  }

  const downloadQRCode = () => {
    const canvas = document
      .getElementById('qr-code-download')
      ?.querySelector<HTMLCanvasElement>('canvas')

    if (canvas) {
      const url = canvas.toDataURL()
      const a = document.createElement('a')

      a.download = 'QRCode.png'
      a.href = url

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const [level, setLevel] = useState<string | number>('L')

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

            <Button.Group style={{ marginTop: 50, marginBottom: 16 }}>
              <Button onClick={diminuir} disabled={size <= 48} icon={<MinusOutlined />}>
                Diminuir
              </Button>
              <Button onClick={aumentar} disabled={size >= 300} icon={<PlusOutlined />}>
                Aumentar
              </Button>
            </Button.Group>
            <QRCode
              size={size}
              value="https://ant.design/"
              icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </div>
        </Panel>

        {/*Download*/}
        <Panel header="Download" key="6" id="qr-code-download">
          <QRCode value="https://ant.design/" bgColor="#fff" style={{ marginBottom: 16 }} />
          <Button type="primary" onClick={downloadQRCode}>
            Download
          </Button>
        </Panel>

        {/*Error Level*/}
        <Panel header="Error Level" key="7">
          <QRCode
            style={{ marginBottom: 16 }}
            errorLevel={level as QRCodeProps['errorLevel']}
            value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
          <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
        </Panel>

        {/*Pop up*/}
        <Panel header="Uso em pop up" key="8">
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<QRCode value="https://ant.design" bordered={false} />}
          >
            <Button type="primary">Hover me</Button>
          </Popover>
        </Panel>
      </Collapse>
    </>
  )
}

export default QRCodeDemonstration
