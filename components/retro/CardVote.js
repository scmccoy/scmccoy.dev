import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon } from '@iconify/react';
import slightlyFrowningFace from '@iconify/icons-emojione/slightly-frowning-face';
import frowningFaceWithOpenMouth from '@iconify/icons-emojione/frowning-face-with-open-mouth';
import dizzyFace from '@iconify/icons-emojione/dizzy-face';
import pileOfPoo from '@iconify/icons-twemoji/pile-of-poo';
import slightlySmilingFace from '@iconify/icons-emojione/slightly-smiling-face';
import smilingFaceWithSmilingEyes from '@iconify/icons-emojione/smiling-face-with-smiling-eyes';
import smilingFaceWithHeartEyes from '@iconify/icons-emojione/smiling-face-with-heart-eyes';

/**
 * Add upvote/downvote for cards
 * No limits
 */

// Add Up vote
const ADD_VOTE_UP = gql`
  mutation voteUp($cardId: ID, $voteTallyUp: Int) {
    voteUp(cardId: $cardId, voteTallyUp: $voteTallyUp) {
      _id
      voteTallyUp
    }
  }
`;
// Add down vote
const ADD_VOTE_DOWN = gql`
  mutation voteDown($cardId: ID, $voteTallyDown: Int) {
    voteDown(cardId: $cardId, voteTallyDown: $voteTallyDown) {
      _id
      voteTallyDown
    }
  }
`;

const CardVote = ({ cardId, voteTallyUp, voteTallyDown }) => {
  const [voteUp] = useMutation(ADD_VOTE_UP, {
    refetchQueries: ['getCards'],
  });
  const [voteDown] = useMutation(ADD_VOTE_DOWN, {
    refetchQueries: ['getCards'],
  });

  let voteUpIcon = slightlySmilingFace;
  let voteDownIcon = slightlyFrowningFace;
  if (voteTallyUp >= 3 && voteTallyUp <= 5) {
    voteUpIcon = smilingFaceWithSmilingEyes;
  }
  if (voteTallyUp >= 6) {
    voteUpIcon = smilingFaceWithHeartEyes;
  }
  if (voteTallyDown >= 3 && voteTallyDown <= 5) {
    voteDownIcon = frowningFaceWithOpenMouth;
  }
  if (voteTallyDown >= 6 && voteTallyDown <= 15) {
    voteDownIcon = dizzyFace;
  }
  if (voteTallyDown > 15) {
    voteDownIcon = pileOfPoo;
  }

  return (
    <Container>
      <VoteBox>
        <ButtonVote
          onClick={() =>
            voteUp({
              variables: {
                cardId: cardId,
                voteTallyUp: voteTallyUp,
              },
            })
          }
        >
          <Icon height="1.3rem" icon={voteUpIcon} />
        </ButtonVote>
        <div>{voteTallyUp}</div>
      </VoteBox>
      <VoteBox>
        <ButtonVote
          onClick={() =>
            voteDown({
              variables: {
                cardId: cardId,
                voteTallyDown: voteTallyDown,
              },
            })
          }
        >
          <Icon height="1.3rem" icon={voteDownIcon} />
        </ButtonVote>
        <div>{voteTallyDown}</div>
      </VoteBox>
    </Container>
  );
};

/* *********
 *  STYLES  *
 ********* */

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;margin-top: 2rem;
`;

const VoteBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonVote = styled.button`
  border: none;
  background: transparent;
`;

export default CardVote;
