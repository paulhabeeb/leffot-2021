import { degrees, PageSizes, PDFDocument, StandardFonts } from 'pdf-lib'

export default async function createReturnInsert({
    items,
    order,
    returnId,
    shippingLabel,
}) {
    const pdfDoc = await PDFDocument.create()
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const helveticaBoldFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
    )

    if (shippingLabel) {
        const labelPDF = await PDFDocument.load(shippingLabel)
        const firstPage = labelPDF.getPages()[0]
        firstPage.setRotation(degrees(-90))
        firstPage.setSize(792, 612)
        firstPage.translateContent(475, 135)

        const [donorPage] = await pdfDoc.copyPages(labelPDF, [0])
        pdfDoc.addPage(donorPage)
    }

    const page = pdfDoc.addPage(PageSizes.Letter)
    page.setFont(helveticaFont)
    page.setFontSize(10)
    const { width, height } = page.getSize()

    // Draw logo
    const logoUrl = 'https://leffot.com/content/logo.png'
    const logoBuffer = await fetch(logoUrl).then(res => res.arrayBuffer())
    const logo = await pdfDoc.embedPng(logoBuffer)
    const pngDims = logo.scale(0.05)

    page.drawImage(logo, {
        x: 50,
        y: height - pngDims.height - 50,
        width: pngDims.width,
        height: pngDims.height,
    })

    // Draw header text
    page.moveTo(160, 724)
    page.drawText('Leffot', {
        font: helveticaBoldFont,
    })
    page.moveDown(14)
    page.drawText('10 Christopher St.')
    page.moveDown(14)
    page.drawText('New York, NY 10014')
    page.moveDown(14)
    page.drawText('(212) 989-4577')

    // Draw instructions
    page.moveTo(50, 642)
    page.drawText('How to return', {
        size: 14,
        font: helveticaBoldFont,
    })
    page.moveDown(18)

    const shippingText = shippingLabel
        ? 'using the attached label'
        : 'at the address above'
    page.drawText(
        `Please include this form in your returned package and ship it to us ${shippingText}. Items must be shipped back to us within the next ten days.`
    )
    page.moveDown(30)

    // Draw customer info
    page.drawText('Order:', {
        font: helveticaBoldFont,
    })
    page.moveDown(14)
    page.drawText('Return:', {
        font: helveticaBoldFont,
    })
    page.moveDown(14)
    page.drawText('Customer:', {
        font: helveticaBoldFont,
    })
    page.moveRight(65)
    page.moveUp(28)

    page.drawText(`#${order.id}`)
    page.moveDown(14)
    page.drawText(`#${returnId}`)
    page.moveDown(14)
    page.drawText(
        `${order.billing_address.first_name} ${order.billing_address.last_name}`
    )
    if (order?.billing_address?.phone) {
        page.moveDown(14)
        page.drawText(order.billing_address.phone)
    }
    if (order?.billing_address?.email) {
        page.moveDown(14)
        page.drawText(order.billing_address.email)
    }
    page.moveLeft(65)
    page.moveDown(30)

    // Draw items grid
    page.drawText('Item', {
        font: helveticaBoldFont,
    })
    page.drawText('Quantity', {
        x: 375,
        font: helveticaBoldFont,
    })
    page.drawText('Outcome', {
        x: 475,
        font: helveticaBoldFont,
    })
    page.moveDown(7)
    page.drawLine({
        start: { x: 50, y: page.getY() },
        end: { x: width - 50, y: page.getY() },
        thickness: 1,
    })
    page.moveTo(50, page.getY() - 15)

    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        page.drawText(item.name)
        page.drawText(`${item.quantity}`, {
            x: 375,
        })
        page.drawText(item.outcome, {
            x: 475,
        })

        page.moveDown(7.5)
        page.drawLine({
            start: { x: 50, y: page.getY() },
            end: { x: width - 50, y: page.getY() },
            thickness: 0.5,
            opacity: 0.5,
        })
        page.moveDown(15)
    }

    return await pdfDoc.saveAsBase64()
}
