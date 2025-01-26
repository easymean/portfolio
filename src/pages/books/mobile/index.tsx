import { data } from '@/pages/books/data';
import './style.scss';
import Icon from '@/components/icon';
import { Card } from '@/components/card';
import { Slider } from '@/components/slider';
import { Section, SectionBody, SectionHeader } from '@/components/section';

export const BooksMobile = () => {
  const cards = data.map((el) => ({
    id: el.id,
    content: (
      <Card
        className="books-mobile-card"
        title={el.title}
        footer={
          <div className="footer">
            <button type="button" onClick={() => moveTo(el.link)}>
              <Icon.addPlus width="52" height="52" />
            </button>
          </div>
        }
      ></Card>
    ),
  }));

  const moveTo = (link: string) => {
    window.open(link);
  };

  return (
    <Section className="books-mobile">
      <SectionHeader>
        <div className="title">BOOKS</div>
      </SectionHeader>
      <SectionBody>
        <div className="books-mobile-wrapper">
          <Slider items={cards} colWidth={'22rem'} />
        </div>
      </SectionBody>
    </Section>
  );
};
