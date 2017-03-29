/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
// @flow
import React from 'react';
import Helmet from 'react-helmet';
import ProfileNotFound from './ProfileNotFound';
import ProfileHeader from '../details/ProfileHeader';
import { translate } from '../../../helpers/l10n';
import type { Profile } from '../propTypes';

type Props = {
  canAdmin: boolean,
  children: React.Element<*>,
  location: { query: { key: string } },
  organization: ?string,
  profiles: Array<Profile>,
  updateProfiles: () => Promise<*>
};

export default class ProfileContainer extends React.PureComponent {
  props: Props;

  render() {
    const { organization, profiles, location, ...other } = this.props;
    const { key } = location.query;
    const profile = profiles.find(profile => profile.key === key);

    if (!profile) {
      return <ProfileNotFound organization={organization} />;
    }

    const child = React.cloneElement(this.props.children, {
      organization,
      profile,
      profiles,
      ...other
    });

    const title = translate('quality_profiles.page') + ' - ' + profile.name;

    return (
      <div>
        <Helmet title={title} titleTemplate="SonarQube - %s" />

        <ProfileHeader
          canAdmin={this.props.canAdmin}
          organization={organization}
          profile={profile}
          updateProfiles={this.props.updateProfiles}
        />
        {child}
      </div>
    );
  }
}
