import React from 'react';
import QRCode from 'react-qr-code';
import { Divider, Input } from 'semantic-ui-react';
import copyToClipboard from '../../helpers/copyToClipboard';
import * as s from './styled';

function EmptyState() {
    return (
        <s.PageContainer>
            <h2>Share Link</h2>
            <QRCode value={window.location.href} />
            <Divider horizontal>Or</Divider>
            <Input
                action={{
                    color: 'teal',
                    labelPosition: 'right',
                    icon: 'copy',
                    content: 'Copy',
                    onClick: () => copyToClipboard(window.location.href),
                }}
                value={window.location.href}
            />
        </s.PageContainer>
    );
}

export default EmptyState;
