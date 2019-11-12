import React, { useState, useCallback } from "react";
import { Form } from "semantic-ui-react";

import ModalForm from "../components/ModalForm";

import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useInput } from "../hooks/input-hook";

interface AssignmentGroupProps {
  courseId: number;
  termId: number;
  groupId?: number;
}

const ASSIGNMENT_GROUP = gql`
  query AssignmentGroup($groupId: ID!) {
    assignmentGroup(groupId: $groupId) {
      groupId
      name
    }
  }
`;

const CREATE_ASSIGNMENT_GROUP = gql`
  mutation CreateAssignmentGroup($courseId: ID!, $termId: ID!, $name: String!, $weight: Float!) {
    createAssignmentGroup(input: { name: $name, weight: $weight, courseId: $courseId, termId: $termId }) {
      groupId
      name
    }
  }
`;

export default function AssignmentGroup({ groupId, courseId, termId, ...rest }: AssignmentGroupProps) {
  // const { loading, error, data } = useQuery(ASSIGNMENT_GROUP, {
  //   variables: { groupId: groupId }
  // });

  const [create] = useMutation(CREATE_ASSIGNMENT_GROUP);
  const { value: name, bind: bindName } = useInput("");
  const { value: weight, bind: bindWeight } = useInput("");

  const onSubmit = () => {
    if (groupId == undefined) {
      create({ variables: { name: name, weight: weight, courseId: courseId, termId: termId } });
    }
  };

  return (
    <ModalForm {...rest} title="Assignment Group" onSubmitAsync={onSubmit} handleSubmit={onSubmit}>
      <Form.Input name="name" placeholder="Name" label="Name" {...bindName} />
      <Form.Input name="weight" label="Weight" {...bindWeight} />
    </ModalForm>
  );
}
