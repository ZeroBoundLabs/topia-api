import mjml2html from 'mjml'
import mailgun from 'mailgun-js'
import config from '../config.js'

export const sendEmail = (to, subject, html) => {
  if (config.mailgunApiKey === undefined) {
    throw new Error('Please setup mailgun credentials in config.json')
  }

  const mg = mailgun({
    host: 'api.eu.mailgun.net',
    apiKey: config.mailgunApiKey,
    domain: config.mailgunDomain
  })
  const from = config.mailgunFrom
  const data = { from, to, subject, html }

  mg.messages().send(data, function (error, body) {
    if (error) {
      return { status: 'error', data: error }
    } else {
      return { status: 'success', data: body }
    }
  })
}

export const applicationReceived = (email, name, orgName) => {
  const mjmlOutput = mjml2html(`
    <mjml>
      <mj-head>
        <mj-font name="Inter" href="https://rsms.me/inter/inter.css" />
      </mj-head>
      <mj-body>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column>
            <mj-text font-size="20px" color="#29303d">TOPIA</mj-text>
          </mj-column>
        </mj-section>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column width="600px">
            <mj-text align="center" font-size="40px" font-family="Inter">
              Application received
            </mj-text>
          </mj-column>
          <mj-column width="600px">
            <mj-text font-size="16px" font-family="Inter" line-height='28px'>
              <p>Hi ${name},</p>
              <p>thank you for your interest in us.</p>
              <p>
                We received your application for <b>${orgName}</b> to join Topia and
                will process it within the next days.
              </p>
              <p>
                In the meantime sit tight and keep fighting the good fight.
                You probably know that already, but you  rock! 🤘</p>
              <p>Talk to you soon,<br/>the Topia team</p>
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column>
            <mj-text color='#b8bcc3'font-size="12px" font-family="Inter">
              <p>© 2019 Topia</p>
              <p>
                Topia<br/>
                Prenzlauer Allee 231<br/>
                Berlin 10405, Germany<br/>
              </p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `)

  sendEmail(email, `${orgName} - Application Received`, mjmlOutput.html)
}

export const applicationAccepted = (email, name, orgName, activateUrl) => {
  const mjmlOutput = mjml2html(`
    <mjml>
      <mj-head>
        <mj-font name="Inter" href="https://rsms.me/inter/inter.css" />
      </mj-head>
      <mj-body>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column>
            <mj-text font-size="20px" color="#29303d">TOPIA</mj-text>
          </mj-column>
        </mj-section>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column width="600px">
            <mj-text align="center" font-size="40px" font-family="Inter">
              You made it! 🎉
            </mj-text>
          </mj-column>
          <mj-column width="600px">
            <mj-text font-size="16px" font-family="Inter" line-height='28px'>
              <p>Hi ${name},</p>
              <p>
                your organization <b>${orgName}</b> has been selected as an
                early launch partner for Topia. We are thrilled to have you
                onboard and help you show the world how you make an impact.
              </p>
              <p>
                Please activate your account by clicking on this link and
                follow our onboarding guide to get you up and running.
              </p>
            </mj-text>
            <mj-button font-size='16px' background-color='#13c266' align='center'
              width='172px' height='48px' color='white' href='${activateUrl}'>
              Activate account
            </mj-button>
            <mj-text font-size="16px" font-family="Inter" line-height='28px'>
              <p>
                If you are running into any problem along the way we’ll be
                around to help you out at any time.
              </p>
              <p>Welcome to the family,<br/>the Topia team</p>
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column>
            <mj-text color='#b8bcc3'font-size="12px" font-family="Inter">
              <p>© 2019 Topia</p>
              <p>
                Topia<br/>
                Prenzlauer Allee 231<br/>
                Berlin 10405, Germany<br/>
              </p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `)

  sendEmail(email, `${orgName} - Application accepted`, mjmlOutput.html)
}

export const applicationRejected = (email, name, orgName) => {
  const mjmlOutput = mjml2html(`
    <mjml>
      <mj-head>
        <mj-font name="Inter" href="https://rsms.me/inter/inter.css" />
      </mj-head>
      <mj-body>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column>
            <mj-text font-size="20px" color="#29303d">TOPIA</mj-text>
          </mj-column>
        </mj-section>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column width="600px">
            <mj-text align="center" font-size="40px" font-family="Inter">
              Application rejected
            </mj-text>
          </mj-column>
          <mj-column width="600px">
            <mj-text font-size="16px" font-family="Inter" line-height='28px'>
              <p>Hi ${name},</p>
              <p>we reviewed your application and unfortunately have to reject it for the following reason:</p>
              <p>
                <b>Your organisation doesn't seem to be an official NGO operating in the social impact sector</b>
              </p>
              <p>
                If you think this is not true, feel free to reply to this email
                and talk with us. Otherwise please register again with
                another organization.
              </p>
              <p>Yours,<br/>the Topia team</p>
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-raw>
        </mj-raw>
        <mj-section>
          <mj-column>
            <mj-text color='#b8bcc3'font-size="12px" font-family="Inter">
              <p>© 2019 Topia</p>
              <p>
                Topia<br/>
                Prenzlauer Allee 231<br/>
                Berlin 10405, Germany<br/>
              </p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `)

  sendEmail(email, `${orgName} - Application Rejected`, mjmlOutput.html)
}

export default {
  sendEmail,
  applicationReceived,
  applicationAccepted,
  applicationRejected
}
