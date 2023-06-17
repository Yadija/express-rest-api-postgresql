/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  content,
  owner,
  created_at,
  updated_at,
}) => ({
  id,
  content,
  owner,
  createdAt: created_at,
  updatedAt: updated_at,
});

export { mapDBToModel };
