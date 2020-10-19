import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
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

// Add Happy

const ADD_VOTE_HAPPY = gql`
  mutation voteHappy($cardId: ID, $voteHappyTally: Int) {
    voteHappy(cardId: $cardId, voteHappyTally: $voteHappyTally) {
      _id
      voteHappyTally
    }
  }
`;
// Add Sad
const ADD_VOTE_SAD = gql`
  mutation voteSad($cardId: ID, $voteSadTally: Int) {
    voteSad(cardId: $cardId, voteSadTally: $voteSadTally) {
      _id
      voteSadTally
    }
  }
`;

const CardVote = ({ cardId, voteHappyTally, voteSadTally }) => {
  const [voteHappy] = useMutation(ADD_VOTE_HAPPY, {
    refetchQueries: ['getCards'],
  });
  const [voteSad] = useMutation(ADD_VOTE_SAD, {
    refetchQueries: ['getCards'],
  });

  let voteHappyIcon = slightlySmilingFace;
  let voteSadIcon = slightlyFrowningFace;
  if (voteHappyTally >= 3 && voteHappyTally <= 5) {
    voteHappyIcon = smilingFaceWithSmilingEyes;
  }
  if (voteHappyTally >= 6) {
    voteHappyIcon = smilingFaceWithHeartEyes;
  }
  if (voteSadTally >= 3 && voteSadTally <= 5) {
    voteSadIcon = frowningFaceWithOpenMouth;
  }
  if (voteSadTally >= 6 && voteSadTally <= 15) {
    voteSadIcon = dizzyFace;
  }
  if (voteSadTally > 15) {
    voteSadIcon = pileOfPoo;
  }

  return (
    <Container>
      <VoteBox>
        <ButtonVote
          onClick={() =>
            voteHappy({
              variables: {
                cardId: cardId,
                voteHappyTally: voteHappyTally,
              },
            })
          }
        >
          <Icon height="1.3rem" icon={voteHappyIcon} />
        </ButtonVote>
        <div>{voteHappyTally}</div>
      </VoteBox>
      <VoteBox>
        <ButtonVote
          onClick={() =>
            voteSad({
              variables: {
                cardId: cardId,
                voteSadTally: voteSadTally,
              },
            })
          }
        >
          <Icon height="1.3rem" icon={voteSadIcon} />
        </ButtonVote>
        <div>{voteSadTally}</div>
      </VoteBox>
    </Container>
  );
};

/* *********
 *  STYLES  *
 ********* */

const Container = styled.div`
  display: flex;
  width: 10rem;
  justify-content: space-between;
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
