/**
 * Chunk loader for communities code.
 */

import LoadingIndicator from 'components/LoadingIndicator';
import path from 'path';
import PT from 'prop-types';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { requireWeak, resolveWeak, SplitRoute } from 'utils/router';

export default function ChunkLoader({ base, communityId, member, meta }) {
  return (
    <SplitRoute
      chunkName="communities"
      renderClientAsync={() =>
        import(
          /* webpackChunkName: "communities" */
          './Routes',
        ).then(({ default: Routes }) => (
          <Routes
            base={base}
            communityId={communityId}
            member={member}
            meta={meta}
          />
        ))
      }
      renderPlaceholder={() => <LoadingIndicator />}
      renderServer={(routeProps) => {
        const p = resolveWeak('./Routes');
        const Routes = requireWeak(path.resolve(__dirname, p));
        return (
          <StaticRouter
            context={routeProps.staticContext}
            location={routeProps.location.pathname}
          >
            <Routes
              base={base}
              communityId={communityId}
              member={member}
              meta={meta}
            />
          </StaticRouter>
        );
      }}
    />
  );
}

ChunkLoader.propTypes = {
  base: PT.string.isRequired,
  communityId: PT.string.isRequired,
  member: PT.bool.isRequired,
  meta: PT.shape().isRequired,
};
