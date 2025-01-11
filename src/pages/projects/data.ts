type DataType = {
  id: string;
  title: string;
  groups: {
    id: string;
    description: string;
    projects: { id: string; title: string; description: string }[];
  }[];
};

export const data: DataType[] = [
  {
    id: 'ncsoft',
    title: 'NCSOFT (22.01.02~',
    groups: [
      {
        id: 'varco',
        description: 'VARCO 개발실 AI 서비스 FE 개발(2024.01~현재)',
        projects: [
          {
            id: 'varcoadmin',
            title: 'VARCO Art Admin 개발',
            description:
              '이미지 생성 AI 서비스인 VARCO Art를 SaaS로 제공하기 위한 어드민툴입니다. 사용자를 초대하여 VARCO Art에 접근 권한을 부여하고 사용자의 토큰과 이미지 생성 권한, 활동 내역을 관리합니다.',
          },
          {
            id: 'varcoui',
            title: 'VARCO UI 개발',
            description:
              'VARCO 서비스(VARCO Text, VARCO Art 등)에서 사용되는 공통 컴포넌트입니다. 디자인 시스템을 기반으로 개발되었습니다.',
          },
          {
            id: 'varcotext',
            title: 'VARCO Text 개선',
            description: 'AI 기반 텍스트 생성 서비스입니다. ',
          },
        ],
      },
      {
        id: 'speechai',
        description: '음성AI랩 AI 프로젝트 FE 개발(2023.05~2023.12)',
        projects: [
          {
            id: 'designsystem',
            title: '디자인 시스템 제작 및 공통 컴포넌트 개발',
            description:
              '디자인 시스템을 직접 제작하고 제작한 디자인 시스템을 가이드라인으로 공통 컴포넌트를 개발했습니다.',
          },
          {
            id: 'speech',
            title: 'Co-creative AI',
            description:
              '음성 AI 기술을 활용한 음성 합성 서비스로, AI 기술의 가능성을 보여주는데 중점을 둔 프로토타입 목적의 서비스입니다. 업로드된 이미지 혹은 음성을 기반으로 AI가 음성을 생성하고 생성한 음성의 어조, 성별, 나이를 편집할 수 있습니다..',
          },
        ],
      },
      {
        id: 'miniverse',
        description: '메타버스 플랫폼 ‘미니버스’ FE 개발(2022.07~2023.01)',
        projects: [
          {
            id: 'miniverse',
            title: '미니버스 직무 상담회 버전 런칭 및 MVP 버전 FE 개발',
            description:
              '웹 기반의 메타버스 플랫폼입니다. 사용자는 줌과 같은 화상 채팅 기능을 통해 실시간 소통을 할 수 있으며, 로블록스와 유사하게 자신만의 가상공간을 구축하거나 게임을 개발할 수 있는 기능을 제공합니다. ',
          },
        ],
      },
      {
        id: 'bard',
        description: 'CH.공성전 FE 개발(2022.01~2022.06)',
        projects: [
          {
            id: 'bard',
            title: 'CH.공성전 베타 버전 개발',
            description:
              '리니지2M 공성전의 로그 데이터를 활용한 Canvas 기반 공성전 시각화 서비스입니다.',
          },
        ],
      },
    ],
  },
  {
    id: 'sinsegae',
    title: '신세계I&C (21.02~21.12)',
    groups: [
      {
        id: 'emart2',
        description: '이마트 2팀',
        projects: [
          {
            id: 'si',
            title: '이마트 관련 B2B 시스템 운영 및 개발',
            description:
              '이마트 광고제휴 시스템, 세금 계산서 시스템, MMS 쿠폰 시스템 운영하고 기능을 추가하여 서비스를 개선했습니다.',
          },
        ],
      },
    ],
  },
];
