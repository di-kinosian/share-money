import { FC } from 'react';
import { BodyText, H4 } from '../../components/styled';
import * as s from './styled';

interface INotFoundProps {
  isBalance?: boolean;
}

const NotFound: FC<INotFoundProps> = (props) => {
  return (
    <s.ContainerProfile>
      <H4>404 - Not Found</H4>

      {props.isBalance ? (
        <BodyText>
          Seems such balance does not exist. Please re-check the URL.
        </BodyText>
      ) : (
        <BodyText>
          The page you are looking for does not exist. Are you sure that URL is
          correct?
        </BodyText>
      )}
    </s.ContainerProfile>
  );
};

export default NotFound;
