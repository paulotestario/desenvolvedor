import React, { useState } from 'react';
import './Resume.css';

const Resume = () => {
  const [expandedJobs, setExpandedJobs] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  const toggleJobDescription = (jobId) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '5521993149994';
    const message = 'Fiquei interessado no seu curriculo e gostaria de mais informações.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDownloadResume = () => {
    const docUrl = '/Curriculum Vitae - Paulo Testa.docx';
    const link = document.createElement('a');
    link.href = docUrl;
    link.download = 'Curriculum Vitae - Paulo Testa.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="resume">
      <header>
        <h1>Paulo César Fernandes Testa Filho</h1>
        <div className="contact-info">
          <p>Estrada da Posse, n° 3750, BL 7, apto 105, Campo Grande, RJ</p>
          <p>CEP: 23088-000</p>
          <p>Celular: (21) 99314-9994</p>
          <p>Email: paulotestario@gmail.com</p>
        </div>
        <div className="header-buttons">
          <button className="whatsapp-button" onClick={handleWhatsAppClick}>
            Entrar em Contato via WhatsApp
          </button>
          <button className="download-button" onClick={handleDownloadResume}>
            Baixar Currículo
          </button>
        </div>
      </header>

      <section className="personal-info">
        <h2>Dados Pessoais</h2>
        <ul>
          <li>Data de Nascimento: 04/09/1989</li>
          <li>Sexo: Masculino</li>
          {expandedSections['personal'] && (
            <>
              <li>Local: Rio de Janeiro / RJ</li>
              <li>Estado Civil: Casado</li>
              <li>Filiação: Talita Machado Testa e Paulo César Fernandes Testa</li>
            </>
          )}
        </ul>
        <button className="see-more" onClick={() => toggleSection('personal')}>
          {expandedSections['personal'] ? '...Mostrar menos' : '...Mostrar mais'}
        </button>
      </section>

      <section className="education">
        <h2>Formação Acadêmica</h2>
        <ul>
          <li>MBA em Administração de Empresas – Universidade Federal do Rio de Janeiro (UFRJ)</li>
          {expandedSections['education'] && (
            <>
              <li>Bacharel em Análise de Sistemas – Universidade Estácio de Sá</li>
              <li>Master in Information Technology (MIT) em Arquitetura de Software – Escola INFNET (em andamento)</li>
              <li>Ensino Médio Profissionalizante (2º Grau Técnico)</li>
            </>
          )}
        </ul>
        <button className="see-more" onClick={() => toggleSection('education')}>
          {expandedSections['education'] ? '...Mostrar menos' : '...Mostrar mais'}
        </button>
      </section>

      <section className="skills">
        <h2>Habilidades Técnicas</h2>
        <ul>
          <li>Linguagens de Programação: .NET (C#, VB.NET, C++), Node.JS, Javascript.</li>
          {expandedSections['skills'] && (
            <>
              <li>Bancos de Dados Relacionais e NoSQL: Oracle, SQL Server, MySQL, PostgreSQL, DynamoDB.</li>
              <li>Ferramentas e Técnicas de Testes: Testes de unidade, TDD, BDD, xUnit, NUnit, MSTest, Selenium, Sonar.</li>
              <li>Ferramentas de CI/CD e Nuvem: Azure DevOps, pipelines YAML, Docker, Kubernetes, Git, SVN, Team Foundation Server (TFS), AWS.</li>
              <li>Frameworks e Bibliotecas Back-end: ASP.NET Framework, ASP.NET Core, ASP.NET MVC, Web Forms, Windows Forms, WebAPI, Entity Framework, NHibernate, ADO.NET, Dapper, Firebase.</li>
              <li>Desenvolvimento em Nuvem: Criação de Lambdas e Azure Functions.</li>
            </>
          )}
        </ul>
        <button className="see-more" onClick={() => toggleSection('skills')}>
          {expandedSections['skills'] ? '...Mostrar menos' : '...Mostrar mais'}
        </button>
      </section>

      <section className="certifications">
        <h2>Cursos e Certificações</h2>
        <ul>
          <li>C# & ASP.NET – Digitada Rio (2006)</li>
          {expandedSections['certifications'] && (
            <li>Matemática Financeira Workshop – Fundação Getúlio Vargas (FGV, 2012)</li>
          )}
        </ul>
        <button className="see-more" onClick={() => toggleSection('certifications')}>
          {expandedSections['certifications'] ? '...Mostrar Menos' : '...Mostrar Mais'}
        </button>
      </section>

      <section className="experience">
        <h2>Experiência Profissional</h2>
        
        <div className="job">
          <h3>Fundação Getúlio Vargas (FGV) - (2021 - 2025)</h3>
          <p>Analista Desenvolvedor – Sênior</p>
          <ul>
            <li>Desenvolvimento e manutenção do sistemas academicos da fundação.</li>
            {expandedJobs['fgv'] && (
              <li>Criação de aplicações web para módulos acadêmicos, incluindo notas e provas.</li>
            )}
          </ul>
          <button className="see-more" onClick={() => toggleJobDescription('fgv')}>
            {expandedJobs['fgv'] ? '...Mostrar menos' : '...Mostrar mais'}
          </button>
        </div>

        <div className="job">
          <h3>Fundação Getúlio Vargas (FGV) - Prestador de Serviços da MGN Informática (2012 - 2021)</h3>
          <p>Analista Desenvolvedor – Sênior</p>
          <ul>
            <li>Desenvolvimento e manutenção do sistema SIGA DOIS utilizando VB.NET e C#</li>
            {expandedJobs['fgv_mgn'] && (
              <>
                <li>Desenvolvimento de sistemas web e desktop</li>
                <li>Integração com sistemas legados</li>
                <li>Otimização de performance de aplicações</li>
              </>
            )}
          </ul>
          <button className="see-more" onClick={() => toggleJobDescription('fgv_mgn')}>
            {expandedJobs['fgv_mgn'] ? '...Mostrar menos' : '...Mostrar mais'}
          </button>
        </div>

        <div className="job">
          <h3>Generali Seguros – Prestador de Serviços na Provider IT (2011 - 2012)</h3>
          <p>Analista Desenvolvedor Geral – Sênior</p>
          <ul>
            <li>Desenvolvimento de sistemas de controle de seguros e fraudes com ASP.NET C# e SQL Server.</li>
            {expandedJobs['generali'] && (
              <li>Implementação de novas funcionalidades e modelagem de processos.</li>
            )}
          </ul>
          <button className="see-more" onClick={() => toggleJobDescription('generali')}>
            {expandedJobs['generali'] ? '...Mostrar menos' : '...Mostrar mais'}
          </button>
        </div>

        <div className="job">
          <h3>OI (Telemar) – Prestador de Serviços na Metatron (2011)</h3>
          <p>Analista Desenvolvedor Web – Sênior</p>
          <ul>
            <li>Desenvolvimento de aplicações em ASP com banco de dados Oracle.</li>
            {expandedJobs['oi'] && (
              <li>Criação de Procedures, Functions e Triggers e desenvolvimento de páginas dinâmicas em Ajax.</li>
            )}
          </ul>
          <button className="see-more" onClick={() => toggleJobDescription('oi')}>
            {expandedJobs['oi'] ? '...Mostrar menos' : '...Mostrar mais'}
          </button>
        </div>

        <div className="job">
          <h3>Multimedia Deluxe (2010)</h3>
          <p>Analista Desenvolvedor Web – Pleno</p>
          <ul>
            <li>Desenvolvimento de sistemas para clientes como Land Rover, KIA e Wella.</li>
            {expandedJobs['multimedia'] && (
              <li>Utilização de ASP 3 camadas com SQL Server, MySQL e Oracle.</li>
            )}
          </ul>
          <button className="see-more" onClick={() => toggleJobDescription('multimedia')}>
            {expandedJobs['multimedia'] ? '...Mostrar menos' : '...Mostrar mais'}
          </button>
        </div>

        <div className="job">
          <h3>Sépia (2009 - 2010)</h3>
          <p>Desenvolvedor VB.NET / Web - Geral</p>
          <ul>
            <li>Desenvolvimento de aplicações SAP, lojas virtuais e sistemas de apoio ao RM Nucleus Totvs.</li>
            {expandedJobs['sepia'] && (
              <li>Utilização de Crystal Reports para criação de relatórios e etiquetas.</li>
            )}
          </ul>
          <button className="see-more" onClick={() => toggleJobDescription('sepia')}>
            {expandedJobs['sepia'] ? '...Mostrar menos' : '...Mostrar mais'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Resume;