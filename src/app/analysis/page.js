import styles from '@/app/styles/analysis.module.css'
import Image from 'next/image'
import AiTitle from '@/assets/analysis/title.png'
import Para from '@/assets/analysis/analysispara.png'
import AnalysisShapes from '@/components/analysis/AnalysisShapes'
import FooterNav from '@/components/shared/FooterNav'

const Page = () => {
  return (
    <>
      <div className={styles['title__wrapper']}>
        <Image src={AiTitle} alt="A.I. analysis" className={styles.title} />
        <Image src={Para} alt="A.I. has estimated the following. Fix estimated information if needed." className={styles['title__para']} />
      </div>
      <AnalysisShapes />
      <FooterNav getSummary/>
    </>
  )
}

export default Page
