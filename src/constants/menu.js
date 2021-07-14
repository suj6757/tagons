import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'FASHION',
    icon: 'iconsminds-air-balloon-1',
    label: 'FASHION',
    to: `${adminRoot}/gogo`,
  },
  {
    id: 'COSMETIC / BEAUTY',
    icon: 'iconsminds-three-arrow-fork',
    label: 'COSMETIC',
    to: `${adminRoot}/second-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    id: 'GROCERIES',
    icon: 'iconsminds-library',
    label: 'GROCERIES',
    to: `${adminRoot}/about`,
  },
  {
    id: 'PRIME',
    icon: 'iconsminds-library',
    label: 'PRIME',
    to: `${adminRoot}/prime`,
  },
];
export default data;
